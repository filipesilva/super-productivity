import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {fadeAnimation} from '../animations/fade.ani';
import {MarkdownComponent} from 'ngx-markdown';
import {IS_ELECTRON} from '../../app.constants';
import {ElectronService} from 'ngx-electron';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GlobalConfigService} from '../../features/config/global-config.service';

const HIDE_OVERFLOW_TIMEOUT_DURATION = 300;

@Component({
  selector: 'inline-markdown',
  templateUrl: './inline-markdown.component.html',
  styleUrls: ['./inline-markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class InlineMarkdownComponent implements OnInit, OnDestroy {
  @Input() isLock = false;

  @Output() changed: EventEmitter<any> = new EventEmitter();
  @Output() focused: EventEmitter<Event> = new EventEmitter();
  @Output() blurred: EventEmitter<Event> = new EventEmitter();
  @ViewChild('wrapperEl', {static: true}) wrapperEl: ElementRef;
  @ViewChild('textareaEl') textareaEl: ElementRef;
  @ViewChild('previewEl', {static: true}) previewEl: MarkdownComponent;

  isHideOverflow = false;
  isShowEdit = false;
  modelCopy: string;

  isTurnOffMarkdownParsing$: Observable<boolean> = this._globalConfigService.misc$.pipe(
    map(cfg => cfg && cfg.isTurnOffMarkdown),
    startWith(false),
  );

  private _hideOverFlowTimeout: number;

  private _model: string;
  @Input() set model(v: string) {
    this._model = v;
    this.modelCopy = v;
  }

  get model() {
    return this._model;
  }


  constructor(
    private _electronService: ElectronService,
    private _cd: ChangeDetectorRef,
    private _globalConfigService: GlobalConfigService,
  ) {
    this.resizeParsedToFit();
  }

  @Input() set isFocus(val: boolean) {
    if (!this.isShowEdit && val) {
      this.toggleShowEdit();
    }
  }

  ngOnInit() {
    if (this.isLock) {
      this.toggleShowEdit();
    } else {
      this.resizeParsedToFit();
    }
    if (IS_ELECTRON) {
      this._makeLinksWorkForElectron();
    }
  }

  ngOnDestroy(): void {
    if (this._hideOverFlowTimeout) {
      window.clearTimeout(this._hideOverFlowTimeout);
    }
  }

  keypressHandler(ev: KeyboardEvent) {
    this.resizeTextareaToFit();
    // TODO check if needed
    // tslint:disable-next-line
    if (ev['keyCode'] === 10 && ev.ctrlKey) {
      this.untoggleShowEdit();
    }

    if (ev.key === 'Enter' && ev.ctrlKey) {
      this.untoggleShowEdit();
    }
  }

  toggleShowEdit($event?) {
    // check if anchor link was clicked
    if (!$event || $event.target.tagName !== 'A') {
      this.isShowEdit = true;
      this.modelCopy = this.model || '';

      setTimeout(() => {
        this.textareaEl.nativeElement.value = this.modelCopy;
        this.textareaEl.nativeElement.focus();
        this.resizeTextareaToFit();
      });
    }
  }

  untoggleShowEdit() {
    if (!this.isLock) {
      this.resizeParsedToFit();
      this.isShowEdit = false;
    }
    this.modelCopy = this.textareaEl.nativeElement.value;

    if (this.modelCopy !== this.model) {
      this.model = this.modelCopy;
      this.changed.emit(this.modelCopy);
    }
  }


  resizeTextareaToFit() {
    this._hideOverflow();
    this.textareaEl.nativeElement.style.height = 'auto';
    this.textareaEl.nativeElement.style.height = this.textareaEl.nativeElement.scrollHeight + 'px';
    this.wrapperEl.nativeElement.style.height = this.textareaEl.nativeElement.offsetHeight + 'px';
  }


  resizeParsedToFit() {
    this._hideOverflow();

    setTimeout(() => {
      if (!this.previewEl) {
        if (this.textareaEl) {
          this.resizeTextareaToFit();
        }
        return;
      }

      this.previewEl.element.nativeElement.style.height = 'auto';
      // NOTE: somehow this pixel seem to help
      this.wrapperEl.nativeElement.style.height = this.previewEl.element.nativeElement.offsetHeight + 'px';
      this.previewEl.element.nativeElement.style.height = '';
    });
  }

  setFocus(ev: Event) {
    this.focused.emit(ev);
  }


  setBlur(ev: Event) {
    this.blurred.emit(ev);
  }

  private _hideOverflow() {
    this.isHideOverflow = true;
    if (this._hideOverFlowTimeout) {
      window.clearTimeout(this._hideOverFlowTimeout);
    }

    this._hideOverFlowTimeout = window.setTimeout(() => {
      this.isHideOverflow = false;
      this._cd.detectChanges();
    }, HIDE_OVERFLOW_TIMEOUT_DURATION);
  }

  private _makeLinksWorkForElectron() {
    const shell = this._electronService.shell;
    this.wrapperEl.nativeElement.addEventListener('click', (ev) => {
      const target = ev.target as HTMLElement;
      if (target.tagName && target.tagName.toLowerCase() === 'a') {
        const href = target.getAttribute('href');
        if (href) {
          ev.preventDefault();
          shell.openExternal(href);
        }
      }
    });
  }
}
