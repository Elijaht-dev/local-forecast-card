# Local Forecast Card

Plot published forecasts from the [Local Forecast integration](https://github.com/Elijaht-dev/local-forecast) in a Home Assistant dashboard. The card displays measured history, the forecast, an optional uncertainty band, and solar summaries.

![Local Forecast solar card in Home Assistant](docs/forecast-card.jpg)

## Install

Install **Local Forecast Card** from its custom repository in **Settings → Marketplace** on HA 2026.11 or later. For a manual install, copy `dist/local-forecast-card.js` to `config/www/` and add `/local/local-forecast-card.js` as a JavaScript module in Dashboard resources.

Add a **Local Forecast** card in the dashboard editor and choose a forecast sensor. Forecast Lab can also generate the YAML. Use the matching version of the integration, which provides the chart and data API.

```yaml
type: custom:local-forecast-card
entity: sensor.solar_production_next_interval
title: Solar production
horizon_hours: 48
history_hours: 24
show_uncertainty: true
show_solar_summary: true
```

## Build

```sh
npm ci
npm run build
```

The release asset is `dist/local-forecast-card.js`. The card uses HA authentication to read the published forecast and includes the user's configured time zone in its labels.

MIT licensed.
