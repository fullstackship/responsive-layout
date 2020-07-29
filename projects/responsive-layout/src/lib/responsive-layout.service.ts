/**
  * @author FulltackShip All Rights Reserved.
  *
  * Custom BreakPoints Service with Custom values based on Angular BreakpointObserver
  *
  * This is for helping to modify&extend const values in CDK breakpints.ts which cannot be motified as wish.
  * This helper service aims to support almost all available screens such as XXSmall&Watch and Large SmartHomeTV.
  *
  * For the original breakpoint information, check at https://github.com/angular/components/blob/master/src/cdk/layout/breakpoints.ts
  *
  */
 import { Injectable, OnDestroy } from '@angular/core';
 import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
 import { map, distinctUntilChanged, tap, filter } from 'rxjs/operators';
 import { Observable, BehaviorSubject } from 'rxjs';


 export const BreakPointsEX = {
   XXSmall: "XXSmall",
   XSmall: "XSmall",
   Small: "Small",
   Medium: "Medium",
   Large: "Large",
   XLarge: "XLarge",
   XXLarge: "XXLarge",
   Watch: "Watch",
   Handset: "Handset",
   Tablet: "Tablet",
   Web: "Web",
   SmartTV: "SmartTV",
   HandsetPortrait: "HandsetPortrait",
   TabletPortrait: "TabletPortrait",
   WebPortrait: "WebPortrait",
   HandsetLandscape: "HandsetLandscape",
   TabletLandscape: "TabletLandscape",
   WebLandscape: "WebLandscape"
 };

 export interface BPMetric {
   minWidth?: number,
   maxWidth?: number;
   minWidthPortrait?: number;
   maxWidthPortrait?: number;
   minWidthLandscape?: number;
   maxWidthLandscape?: number;
 }

 export interface BPConfigParams<T extends BPMetric> {
   xxs: T;
   xs: T;
   s: T;
   m: T;
   l: T;
   xl: T;
   xxl: T;
   offset1: number;
   offset2: number;
   watch?: T;
   handset?: T;
   tablet?: T;
   web?: T;
   smartTV?: T;
 }

 @Injectable({
   providedIn: 'root'
 })
 export class ResponsiveLayoutService implements OnDestroy {


   private _activatedBreakpoints: string[] = [];
   public _customBreakpoints: { [key: string]: string; };

   public _preserveBP$: BehaviorSubject<any> = new BehaviorSubject<any>('');
   public preserveBP$ = this._preserveBP$.asObservable();

   constructor(
     private bpObserver: BreakpointObserver
   ) {
     // console.log("AppLayoutService contructor!");
   }

   ngOnDestroy(): void {
     // console.log("AppLayoutService|ngOnDestroy!")
   }


   _configureCustomBreakPoints(
     paramsArg?: BPConfigParams<BPMetric>
   ) {

     let params: Partial<BPConfigParams<BPMetric>> = {};
     params.xxs = { maxWidth: 299.99 }; //Watch, Tiny IoT devices...
     params.xs = { minWidth: 300, maxWidth: 898.99 };
     params.s = { minWidth: 899, maxWidth: 1387.99 };
     params.m = { minWidth: 1388, maxWidth: 1749.99 };
     params.l = { minWidth: 1750, maxWidth: 2149.99 };
     params.xl = { minWidth: 2150, maxWidth: 2399.99 };
     params.xxl = { minWidth: 2400 }; //Super Big Screen with High resolutions
     params.offset1 = 240; //major offset
     params.offset2 = 0; //minor offset
     params.handset = {
       maxWidthPortrait: params.xs.maxWidth, maxWidthLandscape: params.s.maxWidth
     };
     params.tablet = {
       minWidthPortrait: params.s.minWidth, maxWidthPortrait: params.s.minWidth + params.offset1 - 0.1, minWidthLandscape: params.m.minWidth, maxWidthLandscape: params.m.maxWidth
     };
     params.web = {
       minWidthPortrait: params.s.minWidth + params.offset1, minWidthLandscape: params.l.minWidth
     };

     if (paramsArg) {
       params = { ...params, ...paramsArg };
     }

     this._customBreakpoints = {
       XXSmall: `(max-width: ${params.xxs.maxWidth}px)`,
       XSmall: `(max-width: ${params.xs.maxWidth}px)and (max-width: ${params.xs.maxWidth}px)`,
       Small: `(min-width: ${params.s.minWidth}px) and (max-width: ${params.s.maxWidth}px)`,
       Medium: `(min-width: ${params.m.minWidth}px) and (max-width: ${params.m.maxWidth}px)`,
       Large: `(min-width: ${params.l.minWidth}px) and (max-width: ${params.l.maxWidth}px)`,
       XLarge: `(min-width: ${params.xl.minWidth}px) and (max-width: ${params.xl.maxWidth}px)`,
       XXLarge: `(min-width: ${params.xxl.minWidth}px)`,

       Handset: `(max-width: ${params.handset.maxWidthPortrait}px) and (orientation: portrait), ` +
         `(max-width: ${params.handset.maxWidthLandscape}px) and (orientation: landscape)`,
       Tablet: `(min-width: ${params.tablet.minWidthPortrait}px) and (max-width: ${params.tablet.maxWidthPortrait}px) and (orientation: portrait), ` +
         `(min-width: ${params.tablet.minWidthLandscape}px) and (max-width: ${params.tablet.maxWidthLandscape}px) and (orientation: landscape)`,
       Web: `(min-width: ${params.web.minWidthPortrait}px) and (orientation: portrait), ` +
         `(min-width: ${params.web.minWidthLandscape}px) and (orientation: landscape)`,

       HandsetPortrait: `(max-width: ${params.handset.maxWidthPortrait}px) and (orientation: portrait)`,
       TabletPortrait: `(min-width: ${params.tablet.minWidthPortrait}px) and (max-width: ${params.tablet.maxWidthPortrait}px) and (orientation: portrait)`,
       WebPortrait: `(min-width: ${params.web.minWidthPortrait}px) and (orientation: portrait)`,

       HandsetLandscape: `(max-width: ${params.handset.maxWidthLandscape}px) and (orientation: landscape)`,
       TabletLandscape: `(min-width: ${params.tablet.minWidthLandscape}px) and (max-width: ${params.tablet.maxWidthLandscape}px) and (orientation: landscape)`,
       WebLandscape: `(min-width: ${params.web.minWidthLandscape}px) and (orientation: landscape)`
     };


     // console.log("  --> _customBreakpoints: ", this._customBreakpoints);

   };

   getCustomBPValues() {
     return Object.values(this._customBreakpoints);
   }

   findBPKeys(target: Object, value: string) {
     return Object.entries(target).find(([, v]) => v === value)[0];
   }

   observeBreakpoints(checkDistinct: boolean = false, params?: BPConfigParams<BPMetric>): Observable<string[]> {

     if (!this._customBreakpoints) {
       this._configureCustomBreakPoints(params);
     }

     return this.bpObserver.observe(this.getCustomBPValues()).pipe(


       distinctUntilChanged(

         (bp1, bp2) => {
           if (checkDistinct) {
             return JSON.stringify(bp1.breakpoints) === JSON.stringify(bp2.breakpoints);
           } else {
             return false;
           }
         }
       ),


       map((result: BreakpointState) => {
         // console.log("  --> AppLayoutService|result: ", result);
         this._activatedBreakpoints.length = 0;
         Object.keys(result.breakpoints).map((keyAsValue) => {

           if (result.breakpoints[keyAsValue]) {
             // console.log("  --> AppLayoutService|keyAsValue: ", keyAsValue);
             const matchKV = this.findBPKeys(this._customBreakpoints, keyAsValue);
             // console.log("  ==> matchKV: ", matchKV);
             this._activatedBreakpoints.push(matchKV);
           }
         });
         // console.log(" --> AppLayoutService:_activatedBreakpoints: ", this._activatedBreakpoints);
         return this._activatedBreakpoints;
       })
     );
   }

   isActivated(bpTarget: string) {
     return this._activatedBreakpoints.find(bp => bp === bpTarget);
   }

 }
