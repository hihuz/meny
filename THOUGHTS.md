## Random thoughts / things related to this project


### Firebase

This is my first project working with firebase, and I have found it to be really smooth so far.
Setting up the database and hooking my react app with it was really easy thanks to the web sdk they provide.

The nosql database format is maybe not particularly suited for the kind of data I am storing here but it works well so far anyway.

One thing to note is that the sdk is fairly huge, about 300k (minified, but not gzipped) of js. I believe you can only import the parts you need, and in my case that would be auth and database, but these two are still around 240k.
I will need to dig a bit more into that (I am not 100% sure of my claims), for now I import the full bundle as the app is still being actively developed.
I also know that it is possible to use their REST API instead of the database sdk which would save quite a bit of bytes, but it may prove hairy for the batched updates that I am doing. I'll need to dig into that as well and refactor as needed.

The auth part still needs to be implemented but from what I have seen it shouldn't be too complex.
The rules to describe different access rights might get a bit tricky though, we'll see.

### React Router v4 stable

I had some previous experience with v3 and v4 alpha, and I tried v4 beta, and then v4 stable (which didn't change much from the beta) on this project.

They went a bit back and forth with the API between v4 alpha and stable so it cost me bit of time to adapt but I understand the lib better now, and the v4 stable is really nice.

I still have a bit of digging to do if I want to polish things but I have it working cleanly.
I also know that they are working on a react-router-redux package that may be interesting to use in this project later on.

### babel-preset-env

I tried this new preset for babel, as it will most likely replace the previous one I was used to (preset-es2015).

It works fine and, as it mimics babel-preset-latest (now deprecated) by default I had an easy time switching. It has the added benefit of letting you specify which envs / browsers you want to target and adjust transpilation / polyfill based on that.

For now I am using the default settings but it can be nice to experiment a bit with the options.

### Milligram

I wanted to try a minimalist (and tiny) css framework and came across Milligram.

It is fairly good and provided a nice starting point for my UI, but I had to fight it a bit on certain css rules that I found too specific (e.g. buttons / inputs), and found a few bugs (like the Roboto font not being applied on text inputs).

I may use it again in the future but for my next project i'll probably experiment with something else (maybe tachyons)

### Tests

As for my other recent projects I am using jest for my unit tests, and it is honestly great.

For now the app logic part (actions, reducers, selectors, utils) has a bunch of tests, but not the components yet. When I am a bit more certain of the shape I want to give them i'll write the tests for them.
