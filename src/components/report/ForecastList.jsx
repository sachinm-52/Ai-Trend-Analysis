import React from 'react';
import { ReportSection } from './ReportSection';
import { getForecastLevelColor, COLORS } from '../../utils/formatters';

export function ForecastList({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <ReportSection num="05" title="Trend Forecast">
      <div style={styles.forecastList}>
        {forecast.map((f, i) => {
          const color = getForecastLevelColor(f.level);
          return (
            <div key={i} className="sp-forecast-row" style={styles.forecastRow}>
              <span className="sp-mono" style={styles.forecastArrow}>
                {f.direction === 'up' ? '↑' : f.direction === 'down' ? '↓' : '→'}
              </span>
              <span className="sp-display" style={styles.forecastName}>
                {f.name}
              </span>
              <span
                className="sp-mono"
                style={{
                  ...styles.levelBadge,
                  color,
                  borderColor: color,
                }}
              >
                {f.level}
              </span>
            </div>
          );
        })}
      </div>
    </ReportSection>
  );
}

const styles = {
  forecastList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  forecastRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: '10px 16px',
    transition: 'border-color 0.2s ease',
  },
  forecastArrow: {
    fontSize: 16,
    color: COLORS.accentWarm,
    width: 16,
    fontWeight: 700,
  },
  forecastName: {
    fontSize: 14.5,
    flex: 1,
    color: COLORS.text,
  },
  levelBadge: {
    fontSize: 10,
    border: '1px solid',
    borderRadius: 20,
    padding: '2px 10px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
};
