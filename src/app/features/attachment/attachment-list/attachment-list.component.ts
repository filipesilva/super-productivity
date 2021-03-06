import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../attachment.model';
import {AttachmentService} from '../attachment.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogEditAttachmentComponent} from '../dialog-edit-attachment/dialog-edit-attachment.component';
import {standardListAnimation} from '../../../ui/animations/standard-list.ani';

@Component({
  selector: 'attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [standardListAnimation]
})
export class AttachmentListComponent implements OnInit {
  @Input() attachments: Attachment[];
  @Input() isDisableControls = false;

  isError: boolean[] = [];

  constructor(
    public readonly attachmentService: AttachmentService,
    private readonly _matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  openEditDialog(attachment?: Attachment) {
    this._matDialog.open(DialogEditAttachmentComponent, {
      restoreFocus: true,
      data: {
        attachment: attachment
      },
    }).afterClosed()
      .subscribe((attachment_) => {
        if (attachment_) {
          if (attachment_.id) {
            this.attachmentService.updateAttachment(attachment_.id, attachment_);
          } else {
            this.attachmentService.addAttachment(attachment_);
          }
        }
      });
  }

  remove(id) {
    this.attachmentService.deleteAttachment(id);
  }

  trackByFn(i: number, attachment: Attachment) {
    return attachment
      ? attachment.id
      : i;
  }
}
