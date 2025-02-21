# Gregorian-Hijri Date Picker

A date picker that supports both Gregorian and Hijri calendars. This standalone component helps users select dates in both calendars seamlessly.

## Features
- Dual calendar support (Gregorian & Hijri)
- Emits selected date in both formats
- Allows setting minimum and maximum date restrictions
- Standalone component with manual setup

## Installation & Setup
Since this is a standalone component, you need to manually integrate it into your Angular project.

### Dependencies
Ensure you have the required dependencies installed:
```bash
npm install @ng-bootstrap/ng-bootstrap hijri-converter
```

### Usage
Import and use the component in your Angular project:

```html
<div class="container mt-5">
  <div class="row">
    <div class="col-md-5">
      <app-date-picker
        (dateSelected)="onDatePicked($event)"
        [currentDate]="currentDate"
        [minDate]="minDate"
        [maxDate]="maxDate">
      </app-date-picker>
    </div>
    <div class="col-md-3">
      <span>{{date?.gregorian}}</span><br>
      <span>{{date?.hijri}}</span>
    </div>
  </div>
</div>
```

### Inputs
| Input         | Type     | Description |
|--------------|---------|-------------|
| `currentDate` | `string` | Sets the initial date (Format: 'YYYY-M-D', e.g., '2025-1-1') |
| `minDate`     | `string` | Sets the minimum selectable date (Format: 'YYYY-M-D') |
| `maxDate`     | `string` | Sets the maximum selectable date (Format: 'YYYY-M-D') |

### Outputs
| Event        | Payload | Description |
|-------------|---------|-------------|
| `dateSelected` | `{ gregorian: string, hijri: string }` | Emits an object containing the selected date in both Gregorian and Hijri formats. |

Example event payload:
```json
{
  "gregorian": "2025-01-01",
  "hijri": "1446-06-20"
}
```

## Customization
- The component can be styled using CSS.
- Modify date formats or localization based on your project requirements.

## Known Issues & Limitations
- Ensure that `hijri-converter` is correctly installed to avoid conversion errors.
- Browser compatibility is dependent on Angular and `ng-bootstrap` support.

For any issues or contributions, feel free to submit a pull request or open an issue.
