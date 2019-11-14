import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalConfigService} from '../../features/config/global-config.service';
import {GLOBAL_CONFIG_FORM_CONFIG} from '../../features/config/global-config-form-config.const';
import {
  ConfigFormConfig,
  ConfigFormSection,
  GlobalConfigSectionKey,
  GlobalConfigState
} from '../../features/config/global-config.model';
import {Subscription} from 'rxjs';
import {ProjectCfgFormKey} from '../../features/project/project.model';
import {IssueIntegrationCfgs} from '../../features/issue/issue';
import {IS_ELECTRON} from '../../app.constants';
import {environment} from '../../../environments/environment';
import {T} from '../../t.const';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'config-page',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPageComponent implements OnInit, OnDestroy {
  T = T;
  globalConfigFormCfg: ConfigFormConfig;

  issueIntegrationCfgs: IssueIntegrationCfgs;
  globalCfg: GlobalConfigState;

  appVersion: string = environment.version;

  private _subs = new Subscription();

  constructor(
    public readonly configService: GlobalConfigService,
  ) {
    // somehow they are only unproblematic if assigned here
    this.globalConfigFormCfg = GLOBAL_CONFIG_FORM_CONFIG.filter((cfg) => IS_ELECTRON || !cfg.isElectronOnly);
  }

  ngOnInit() {
    this._subs.add(this.configService.cfg$.subscribe((cfg) => {
      this.globalCfg = cfg;
    }));
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  trackBySectionKey(i: number, section: ConfigFormSection<{ [key: string]: any }>) {
    return section.key;
  }

  saveGlobalCfg($event: { sectionKey: GlobalConfigSectionKey | ProjectCfgFormKey, config: any }) {
    const config = $event.config;
    const sectionKey = $event.sectionKey as GlobalConfigSectionKey;

    if (!sectionKey || !config) {
      throw new Error('Not enough data');
    } else {
      this.configService.updateSection(sectionKey, config);
    }
  }

  toggleDarkMode(change: MatSlideToggleChange) {
    this.configService.updateSection('misc', {isDarkMode: change.checked});
  }
}
