<br />
<p align="center">
  <a href="https://github.com/fullstackship">
    <img src="https://avatars3.githubusercontent.com/u/50682580?s=400&u=2122f5a1e5b8af4c42d49924d9f8c267d760b1ad&v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Responsive Layout</h3>

<p align="center">
    Custom BreakPoints Service with Custom values based on Angular BreakpointObserver
    <br />
    <br />
    <a href="https://github.com/fullstackship/responsive-layout/issues">Report Bug</a>
    ·
    <a href="https://github.com/fullstackship/responsive-layout/issues">Request Feature</a>
  </p>
</p>



## About The Project


  * Custom BreakPoints Service with Custom values based on Angular BreakpointObserver
  
  * This is for helping to modify&extend const values in CDK breakpints.ts which cannot be motified as wish.
  * This helper service aims to support almost all available screens such as XXSmall&Watch and Large SmartHomeTV.
  
  * For the original breakpoint information, check at https://github.com/angular/components/blob/master/src/cdk/layout/breakpoints.ts


<!-- GETTING STARTED -->

## Getting Started

This library compiled with Ivy version, not View Engine. You may need to enable Ivy to use this library.

Read more here: https://v9.angular.io/guide/ivy#maintaining-library-compatibility


## Install

To use @fullstackship/responsive-layout in your project install it via [npm](https://www.npmjs.com/package/@swimlane/ngx-charts):

```
npm i @fullstackship/responsive-layout --save
```


## Usage


Import the library module and add it in AppModule or some SharedModule

```typescript
import { ResponsiveLayoutModule } from '@fullstackship/responsive-layout';
```

To use it, import ResponsiveLayoutService in a component.
```typescript
import { ResponsiveLayoutService, BreakPointsEX } from '@fullstackship/responsive-layout';

constructor(
    private layoutSV: ResponsiveLayoutService
) {
}

```

You can subscribe the BreakPoints.
The following is an example how to change SideNav's Width dynamically using this library.
```typescript
this.layoutChanges = this.layoutSV.observeBreakpoints().pipe(
).subscribe(
  result => {
    console.log(" ==> AppLayoutComponent|result: ", result);
    this.isXSmall = this.isSmall = this.isMedium = this.isLarge = this.isXLarge = false;
    for (let matchedBP of result) {

      if (matchedBP === BreakPointsEX.XSmall) {
        this.isXSmall = true;
        // this._sideNavWidth$.next('50px');
      } else if (matchedBP === BreakPointsEX.Small) {
        this._sideNavWidth$.next('90px');
      } else if (matchedBP === BreakPointsEX.Medium) {
        this._sideNavWidth$.next('200px');
      } else if (matchedBP === BreakPointsEX.Large) {
        this._sideNavWidth$.next('250px');
      } else if (matchedBP === BreakPointsEX.XLarge) {
        this._sideNavWidth$.next('300px');
      } else if (matchedBP === BreakPointsEX.XXLarge) {
        this._sideNavWidth$.next('300px');
      }
    }
  }
);
```

The BreakPointEX constants are defined like the following :
```typescript
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
```





## Roadmap

- User-defined custom breakpoints



## License

Distributed under the MIT License. See `LICENSE` for more information.


## Contact

- [Fullstackship.com](https://fullstackship.com)
- [@fullstackx](https://twitter.com/fullstackx)

## Acknowledgements

* [Github flex-layout](https://github.com/angular/flex-layout)

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


