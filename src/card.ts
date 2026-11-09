import { LitElement, css, html, nothing, type PropertyValues } from "lit";

interface Hass {
  states: Record<string, { attributes: Record<string, unknown> }>;
  callWS<T>(command: Record<string, unknown>): Promise<T>;
  themes?: { darkMode?: boolean };
}

interface Config {
  type?: string;
  entity: string;
  title?: string;
  horizon_hours?: number;
  history_hours?: number;
  show_uncertainty?: boolean;
  show_solar_summary?: boolean;
}

interface Point { start: number; value: number | null; p10?: number | null; p90?: number | null }
interface SolarTotal { wh: number | null; complete: boolean }
interface Result {
  status: string;
  name: string;
  forecast: {
    cutoff: number; issued_at: number; timezone: string; unit: string; step_minutes: number; model: string;
    actual: Point[]; points: Point[];
    solar: { today_remaining: SolarTotal; tomorrow: SolarTotal; peak: { watts: number; start: number } | null } | null;
  } | null;
}

const statuses: Record<string, string> = {
  paused: "Publishing is paused for this project.", expired: "This forecast has expired.",
  waiting: "Waiting for the first published forecast.", running: "The forecast is running.",
  error: "Open Forecast Lab to see why the forecast is unavailable.",
};
let chartModule: Promise<unknown> | undefined;
const chartUrl = "/local_forecast_static/forecast-lab.js?v=0.1.0";

function loadChart(): Promise<unknown> {
  if (customElements.get("local-forecast-chart")) return Promise.resolve();
  chartModule ??= import(/* @vite-ignore */ chartUrl).catch((error: unknown) => {
    chartModule = undefined;
    throw error;
  });
  return chartModule;
}

function selectable(hass?: Hass): string[] {
  return Object.entries(hass?.states ?? {})
    .filter(([id, state]) => id.startsWith("sensor.") && state.attributes.forecast_status !== undefined)
    .map(([id]) => id).sort();
}

function displayEnergy(total: SolarTotal): string {
  if (total.wh === null) return "Unavailable";
  return `${(total.wh / 1000).toLocaleString(undefined, { maximumFractionDigits: 2 })} kWh${total.complete ? "" : " (partial)"}`;
}

export class LocalForecastCard extends LitElement {
  static properties = {
    hass: {}, config: { state: true }, result: { state: true }, error: { state: true },
  };
  static styles = css`
    :host { display: block; min-width: 0; }
    section { padding: 16px; min-width: 0; }
    header { display: flex; gap: 8px 16px; flex-wrap: wrap; align-items: baseline; justify-content: space-between; margin-bottom: 6px; }
    h2 { font-size: 18px; line-height: 1.3; margin: 0; font-weight: 650; }
    .muted { color: var(--secondary-text-color); font-size: 12px; }
    .stale { color: var(--warning-color, #9d5d00); }
    local-forecast-chart { --lf-chart-height: clamp(220px, 36vw, 300px); }
    dl { display: flex; flex-wrap: wrap; gap: 8px 24px; margin: 8px 0 0; padding-top: 12px; border-top: 1px solid var(--divider-color); }
    dt { font-size: 12px; color: var(--secondary-text-color); }
    dd { margin: 1px 0 0; font-weight: 600; }
  `;

  hass?: Hass;
  private config?: Config;
  private result?: Result;
  private error = "";
  private timer?: ReturnType<typeof setInterval>;
  private pending = false;
  private stateKey = "";

  static getConfigElement() {
    return document.createElement("local-forecast-card-editor");
  }

  static getStubConfig(hass?: Hass): Config {
    return { entity: selectable(hass)[0] ?? "", horizon_hours: 48, show_uncertainty: true, show_solar_summary: true };
  }

  setConfig(config: Config): void {
    if (!config.entity || !/^sensor\.[a-z0-9_]+$/.test(config.entity)) {
      throw new Error("Choose a Local Forecast sensor.");
    }
    for (const [name, value, max] of [["horizon_hours", config.horizon_hours, 168], ["history_hours", config.history_hours, 48]] as const) {
      if (value !== undefined && (!Number.isInteger(value) || value < 1 || value > max)) {
        throw new Error(`${name} must be between 1 and ${max}.`);
      }
    }
    if (this.config?.entity !== config.entity) {
      this.result = undefined;
      this.error = "";
      this.stateKey = "";
    }
    this.config = { ...config };
  }

  getCardSize(): number { return 5; }

  connectedCallback(): void {
    super.connectedCallback();
    this.timer = setInterval(() => { void this.refresh(); }, 30000);
  }

  disconnectedCallback(): void {
    clearInterval(this.timer);
    super.disconnectedCallback();
  }

  protected updated(changes: PropertyValues): void {
    if (!this.config || !this.hass) return;
    const attrs = this.hass.states[this.config.entity]?.attributes;
    const signature = `${this.config.entity}/${attrs?.issued_at}/${attrs?.forecast_status}`;
    if (signature !== this.stateKey || changes.has("config")) {
      this.stateKey = signature;
      void this.refresh();
    }
  }

  private async refresh(): Promise<void> {
    const entity = this.config?.entity;
    if (!entity || !this.hass || !this.isConnected || this.pending) return;
    this.pending = true;
    try {
      const result = await this.hass.callWS<Result>({ type: "local_forecast/card", entity_id: entity });
      if (result.forecast) await loadChart();
      if (this.config?.entity === entity) {
        this.error = "";
        this.result = result;
      }
    } catch (error) {
      if (this.config?.entity === entity) {
        this.result = undefined;
        this.error = typeof error === "object" && error !== null && "message" in error ?
          String(error.message) : "Could not load the forecast. Check that the integration is installed.";
      }
    } finally {
      this.pending = false;
      if (this.config?.entity !== entity) void this.refresh();
    }
  }

  render() {
    const result = this.result;
    const forecast = result?.forecast;
    const config = this.config;
    const horizon = config?.horizon_hours ?? 48;
    const history = config?.history_hours ?? 24;
    const date = (stamp: number) => new Date(stamp * 1000).toLocaleString(undefined, {
      timeZone: forecast?.timezone, dateStyle: "short", timeStyle: "short",
    });
    return html`<ha-card><section>
      <header><h2>${config?.title || result?.name || "Local Forecast"}</h2>
        ${forecast ? html`<span class=${`muted ${result?.status === "stale" ? "stale" : ""}`}>
          ${result?.status === "stale" ? "Stale · " : ""}Issued ${date(forecast.issued_at)}
        </span>` : nothing}
      </header>
      ${this.error ? html`<p role="alert">${this.error}</p>` : !forecast ?
        html`<p role="status">${result ? statuses[result.status] ?? "No forecast is available." : "Loading forecast…"}</p>` :
        html`<local-forecast-chart
          .actual=${forecast.actual.filter(point => point.start >= forecast.cutoff - history * 3600)}
          .points=${forecast.points.filter(point => point.start < forecast.cutoff + horizon * 3600)}
          .timezone=${forecast.timezone} .unit=${forecast.unit} .cutoff=${forecast.cutoff}
          .modelLabel=${forecast.model} .showBand=${config?.show_uncertainty ?? true}
          .dark=${!!this.hass?.themes?.darkMode}></local-forecast-chart>
          ${forecast.solar && config?.show_solar_summary !== false ? html`<dl>
            <div><dt>Remaining today</dt><dd>${displayEnergy(forecast.solar.today_remaining)}</dd></div>
            <div><dt>Tomorrow</dt><dd>${displayEnergy(forecast.solar.tomorrow)}</dd></div>
            ${forecast.solar.peak ? html`<div><dt>Peak · ${date(forecast.solar.peak.start)}</dt>
              <dd>${forecast.solar.peak.watts.toLocaleString(undefined, { maximumFractionDigits: 0 })} W</dd></div>` : nothing}
          </dl>` : nothing}
        `}
    </section></ha-card>`;
  }
}

class ForecastCardEditor extends LitElement {
  static properties = { hass: {}, config: { state: true } };
  static styles = css`
    :host { display: grid; gap: 12px; padding: 8px 0; }
    label { display: grid; gap: 5px; min-width: 0; }
    input:not([type=checkbox]), select { border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; width: 100%; box-sizing: border-box; font: inherit; color: inherit; background: var(--card-background-color); }
    label.check { display: flex; align-items: center; gap: 7px; }
    input[type=checkbox] { accent-color: var(--primary-color); }
  `;

  hass?: Hass;
  private config: Config = { entity: "" };

  setConfig(config: Config): void { this.config = { ...config }; }

  private updateConfig<K extends keyof Config>(key: K, value: Config[K]): void {
    this.config = { ...this.config, [key]: value };
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this.config }, bubbles: true, composed: true }));
  }

  render() {
    const entities = [...new Set([this.config.entity, ...selectable(this.hass)].filter(Boolean))];
    const numeric = (key: "horizon_hours" | "history_hours", label: string, fallback: number, max: number) =>
      html`<label>${label}<input type="number" min="1" max=${max} .value=${String(this.config[key] ?? fallback)}
        @change=${(event: Event) => {
          const value = (event.target as HTMLInputElement).valueAsNumber;
          if (Number.isInteger(value) && value >= 1 && value <= max) this.updateConfig(key, value);
        }}></label>`;
    const check = (key: "show_uncertainty" | "show_solar_summary", label: string) =>
      html`<label class="check"><input type="checkbox" .checked=${this.config[key] !== false}
        @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).checked)}>${label}</label>`;
    return html`<label>Forecast entity<select .value=${this.config.entity}
      @change=${(event: Event) => this.updateConfig("entity", (event.target as HTMLSelectElement).value)}>
      <option value="" disabled ?selected=${!this.config.entity}>Select a forecast sensor</option>
      ${entities.map(id => html`<option value=${id} ?selected=${id === this.config.entity}>
        ${String(this.hass?.states[id]?.attributes.friendly_name ?? id)}</option>`)}
    </select></label>
    <label>Title<input .value=${this.config.title ?? ""}
      @change=${(event: Event) => this.updateConfig("title", (event.target as HTMLInputElement).value)}></label>
    ${numeric("horizon_hours", "Forecast hours", 48, 168)}
    ${numeric("history_hours", "History hours", 24, 48)}
    ${check("show_uncertainty", "Show uncertainty band")}
    ${check("show_solar_summary", "Show solar summary")}`;
  }
}

if (!customElements.get("local-forecast-card")) {
  customElements.define("local-forecast-card", LocalForecastCard);
  customElements.define("local-forecast-card-editor", ForecastCardEditor);
  const scope = window as Window & { customCards?: Record<string, unknown>[] };
  (scope.customCards ??= []).push({
    type: "local-forecast-card", name: "Local Forecast", preview: true,
    description: "Plot actual and predicted values from a Local Forecast project.",
  });
}
