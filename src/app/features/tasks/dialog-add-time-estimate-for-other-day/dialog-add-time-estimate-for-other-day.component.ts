import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

interface NewTimeEntry {
  timeSpent: number;
  date: string;
}

@Component({
  selector: 'dialog-time-estimate',
  templateUrl: './dialog-add-time-estimate-for-other-day.component.html',
  styleUrls: ['./dialog-add-time-estimate-for-other-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddTimeEstimateForOtherDayComponent {
  newEntry: NewTimeEntry;

  constructor(private _matDialogRef: MatDialogRef<DialogAddTimeEstimateForOtherDayComponent>) {
    this.newEntry = {
      date: '',
      timeSpent: 0
    };
  }

  submit() {
    this._matDialogRef.close(this.newEntry);
  }
}
