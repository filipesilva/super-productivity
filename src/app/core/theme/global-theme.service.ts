import {Inject, Injectable} from '@angular/core';
import {BodyClass, IS_ELECTRON} from '../../app.constants';
import {IS_MAC} from '../../util/is-mac';
import {take} from 'rxjs/operators';
import {isTouch} from '../../util/is-touch';
import {ProjectThemeCfg} from '../../features/project/project.model';
import {MaterialCssVarsService} from 'angular-material-css-vars';
import {DOCUMENT} from '@angular/common';
import {ElectronService} from 'ngx-electron';
import {ProjectService} from '../../features/project/project.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ChromeExtensionInterfaceService} from '../chrome-extension-interface/chrome-extension-interface.service';
import {ThemeService as NgChartThemeService} from 'ng2-charts';
import {GlobalConfigService} from '../../features/config/global-config.service';
import {MiscConfig} from '../../features/config/global-config.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalThemeService {
  private _isDarkTheme: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _materialCssVarsService: MaterialCssVarsService,
    private _electronService: ElectronService,
    private _projectService: ProjectService,
    private _globalConfigService: GlobalConfigService,
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
    private _chartThemeService: NgChartThemeService,
    private _chromeExtensionInterface: ChromeExtensionInterfaceService,
  ) {
  }

  init() {
    this._initIcons();
    this._initHandlersForInitialBodyClasses();
    this._initThemeWatchers();
  }

  private _setDarkTheme(isDarkTheme: boolean) {
    this._materialCssVarsService.setDarkTheme(isDarkTheme);
    this._setChartTheme(isDarkTheme);
    // this._materialCssVarsService.setDarkTheme(true);
    // this._materialCssVarsService.setDarkTheme(false);
  }

  private _setColorTheme(theme: ProjectThemeCfg) {
    this._materialCssVarsService.setAutoContrastEnabled(theme.isAutoContrast);

    if (!theme.isAutoContrast) {
      this._materialCssVarsService.setContrastColorThresholdPrimary(theme.huePrimary);
      this._materialCssVarsService.setContrastColorThresholdAccent(theme.hueAccent);
      this._materialCssVarsService.setContrastColorThresholdWarn(theme.hueWarn);
    }

    this._materialCssVarsService.setPrimaryColor(theme.primary);
    this._materialCssVarsService.setAccentColor(theme.accent);
    this._materialCssVarsService.setWarnColor(theme.warn);
  }

  private _initIcons() {
    this._matIconRegistry.addSvgIcon(
      `sp`,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/sp.svg`)
    );
    this._matIconRegistry.addSvgIcon(
      `play`,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/play.svg`)
    );
    this._matIconRegistry.addSvgIcon(
      `github`,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/github.svg`)
    );
    this._matIconRegistry.addSvgIcon(
      `jira`,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/jira.svg`)
    );
    this._matIconRegistry.addSvgIcon(
      `drag_handle`,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/drag-handle.svg`)
    );
  }

  private _initThemeWatchers() {
    // init theme watchers
    this._projectService.currentTheme$.subscribe((theme: ProjectThemeCfg) => this._setColorTheme(theme));


    // TODO beautify code here
    if (IS_ELECTRON && this._electronService.isMacOS) {
      this._setDarkTheme(this._electronService.remote.systemPreferences.isDarkMode());
      this._electronService.remote.systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
        this._globalConfigService.misc$.pipe(take(1)).subscribe((misc: MiscConfig) => {
          const isDarkTheme = (IS_ELECTRON && this._electronService.isMacOS)
            ? this._electronService.remote.systemPreferences.isDarkMode()
            : misc.isDarkMode;

          this._setDarkTheme(isDarkTheme);
        });
      });
    } else {
      this._globalConfigService.misc$.subscribe((misc: MiscConfig) => {
        const isDarkTheme = (IS_ELECTRON && this._electronService.isMacOS)
          ? this._electronService.remote.systemPreferences.isDarkMode()
          : misc.isDarkMode;

        this._setDarkTheme(isDarkTheme);
      });
    }
  }

  private _initHandlersForInitialBodyClasses() {
    this.document.body.classList.add(BodyClass.isNoAdvancedFeatures);

    if (IS_MAC) {
      this.document.body.classList.add(BodyClass.isMac);
    } else {
      this.document.body.classList.add(BodyClass.isNoMac);
    }

    if (IS_ELECTRON) {
      this.document.body.classList.add(BodyClass.isElectron);
      this.document.body.classList.add(BodyClass.isAdvancedFeatures);
      this.document.body.classList.remove(BodyClass.isNoAdvancedFeatures);
    } else {
      this.document.body.classList.add(BodyClass.isWeb);
      this._chromeExtensionInterface.onReady$.pipe(take(1)).subscribe(() => {
        this.document.body.classList.add(BodyClass.isExtension);
        this.document.body.classList.add(BodyClass.isAdvancedFeatures);
        this.document.body.classList.remove(BodyClass.isNoAdvancedFeatures);
      });
    }

    if (isTouch()) {
      this.document.body.classList.add(BodyClass.isTouchDevice);
    } else {
      this.document.body.classList.add(BodyClass.isNoTouchDevice);
    }
  }


  private _setChartTheme(isDarkTheme: boolean) {
    const overrides = (isDarkTheme)
      ? {
        legend: {
          labels: {fontColor: 'white'}
        },
        scales: {
          xAxes: [{
            ticks: {fontColor: 'white'},
            gridLines: {color: 'rgba(255,255,255,0.1)'}
          }],
          yAxes: [{
            ticks: {fontColor: 'white'},
            gridLines: {color: 'rgba(255,255,255,0.1)'}
          }]
        }
      }
      : {};
    this._chartThemeService.setColorschemesOptions(overrides);
  }
}
