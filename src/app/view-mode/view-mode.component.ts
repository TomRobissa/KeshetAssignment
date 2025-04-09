import { Component, output } from '@angular/core';
import { ReceiptsViewMode } from '../../shared/ReceiptViewMode';

@Component({
  selector: 'app-view-mode',
  imports: [],
  templateUrl: './view-mode.component.html',
  styleUrl: './view-mode.component.css',
})
export class ViewModeComponent {
  receiptsViewMode: ReceiptsViewMode = 'table-only';
  viewModeChange = output<ReceiptsViewMode>({ alias: 'view-mode-change' });

  onViewModeClicked(viewMode: ReceiptsViewMode) {
    this.receiptsViewMode = viewMode;
    this.viewModeChange.emit(viewMode);
  }
}
