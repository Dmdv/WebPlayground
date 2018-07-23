# Using JS external dependencies in Typescript

This is the preferred method. This is only available for TypeScript 2.0+ users. 

#### First:

``` 
npm install --save-dev @types/node 
```

The types should then be automatically included by the compiler. 
See more in [handbook](http://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html)

#### For example:

``` 
npm install --save @types/lodash 
```

For an NPM package "foo", typings for it will be at "@types/foo".
If you can't find your package, look for it on [TypeSearch](http://microsoft.github.io/TypeSearch).

If you still can't find it, check if it bundles its own typings. 
This is usually provided in a "types" or "typings" field in the package.json, or just look for any ".d.ts" 
files in the package and manually include them with a
```
/// <reference path="" /> 
```
## Rx

```
npm install @reactivex/rxjs
```

It's not necessary to install typings beacuse Rx 5 is already implemented in Typescript

To import the entire core set of functionality:

```
import { Observable } from '@reactivex/rxjs';

Observable.of(1,2,3)

var obs = Observable.interval(500)
	   .do(i => console.log(i) )
	   .subscribe();
```
