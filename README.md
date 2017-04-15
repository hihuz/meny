# Meny

Yum Yum !

**_tl;dr_** : The project is deployed [here](https://meny-demo.netlify.com), but beware that it is a work in progress so expect a lot of unfinished stuff.

### What is this repo about ?

The goal of this project is to provide a way for me and my wife to store recipes that we have tried and tweaked to our liking, share them, and be able to edit / delete them as needed.
Ultimately anybody could come to the site and use the app to browse the recipes or even add their own recipes.

Nothing fancy or new, but it was a good idea for me to build a decent-sized app and try some new technologies / libs in the process.


### Is it finished ?

Well, no, not at all :D

The basic functionnality is there, so one can come to the site and browse / add / edit recipes, but some key features are not yet implemented:

- Auth : the idea is to add an actual authentification process with firebase (since I am using firebase for the data), and some user profile page / option. For now there is a simple dummy menu in the nav to simulate different users in the client.
- Images : having customized images for each recipe that one can upload / edit / tweak, for now most of the recipe specifics images display a pug wrapped in a scarf.
- Animations / Transitions / Polish : I haven't payed too much attention to this so far so the UI is a bit rough, but improvement is definitely planned.
- Production optimizations / PWA features : offline support, app manifest, bundle size reduction, all of this and more is on the list but this will come after the other features.

The list will be updated as I make progress on these.


### Can I see where we are now ?

Sure, right now the repo is hooked up to a dummy firebase project with a few recipes for external testing, and thanks to the awesome guys at netlify, the app is deployed and updated on each git push.

Here is the url : [https://meny-demo.netlify.com](https://meny-demo.netlify.com)

You can choose a dummy user and add recipes if you want. You can also edit the recipes that you have added and browse the other ones.


### Anything else ?

You can contact me if you have any questions.

If you want to know more about what I learned when working on this project, see [this file](/THOUGHTS.md).
