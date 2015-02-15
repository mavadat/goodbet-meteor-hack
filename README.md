# Toolbox
- Reactive Test Runner: [meteor-velocity](http://velocity.meteor.com/)
- Test Runner: Karma
- Unit Testing Framework: [sanjo:jasmine](https://atmospherejs.com/sanjo/jasmine)
- Mocking Framework: *(as above)*
- Markdown Editor: **Sublime Text** + [Chrome Minimalist Markdown Editor](https://chrome.google.com/webstore/detail/minimalist-markdown-edito/pghodfjepegmciihfhdipmimghiakcjf)
- CSV Import: [harrison:papa-parse](https://atmospherejs.com/harrison/papa-parse)

# Resources
- [Why Meteor?](http://www.meteorpedia.com/read/Why_Meteor)

# Progress
Capturing important moments as I progress through this. I have already spent few hours reading about Meteor. I am impressed by how quickly nice little apps can be put together with Meteor without typical distractions. Let's see how it pays off for my little Goodbet application.

- First commit i.e. Big Bang. I left Meteor stuff in place with no change to capture in history. Since I intend to use Bootstrap and more modules than everything in *myapp.js* I will clean it up soon.
- An empty CSS file doesn't help anyone. So just deleted *goodbet.css*. [Atmosphere](https://atmospherejs.com) seem to be respected Meteor package management repository. [twbs:booitstrap](https://atmospherejs.com/twbs/bootstrap) says **official** and has highest rating so I feel comfortable already. Let's install the package now.
- Since nature of app is analytics I would favour aggregate processing during data entry (import?). I want to prepare all necessary aggregate data that ease filtering and analytics down the track. Something like **Customer** already knowing how many bets they had, how many wins, how much total stake, etc. Seems like pure JS stuff for now... Customer, Event, and Participant only have ID however I assume in real-world application they'll have more than just an ID to describe them.
- Oops, this Meteor **var** vs no var got me now! No need for *RequireJS* and this Meteor *Require* didn't work anyways so let's move on.
- There seem to be an element of events here. I am going with poor man pubsub.
- I need an agreegate root. I am making up the concept of **Worksheet**. It comes from the idea of user playing around multiple CSV files is focusing on single worksheet at hand. Of course in real world situation this should come from domain but right now I get the luxury of making things up :)
- For Jasmine tests I don't like this part: It expects my tests to be in specific folder structure like server/unit, client/unit, server/integration, etc and test files cannot be called *spec.js* but *my.spec.js* is accepted. For now I move my aggregation calculation tests to *client/unit* which is not ideal but I have to move on - nearly an hour already and nothing is running yet!
- As for test running I quiet liked the Velocity integration (**velocity:html-reporter**) with my Meteor app. Automatically launches Karma which by default launches *Chrome* (might change to *PhantomJS* later) and then I get Velocity sidebar on top of my Meteor application display status. Literally in no time I had my own little CI running. +1 to Meteor on this one :)
- Unfortunately due to Session (UI state) limitation on only accepting EJSON-able types, and Meteor namespacing constraints I had to merge *worksheet.load.js* and *bets.js* into *main.js*. Moving this to MongoDB document would take much longer so I'm happy to live with this for now.
- I happen to require parameterised test (or data test) with Jasmine. AFAIK it doesn't support OOTB.
- Unfortunately I ran out of time and there seem to be lots of areas to improve; however, most important part would be treating risk constants (60%, 10x and 30x limits for risky, and $1000 to-win as too high) as variables using sliders for instance so BI user can play with the numbers to better tailor their view. Also a checkbox to filter out risk-free items would be nice.

# Notes
- In this exercise though, tools like MS Excel would suffice. Alternatively online cubes can be defined for BI users and then CSV data can be imported manually for online business analytics.
- Deployed live to [goodbet.meteor.com](http://goodbet.meteor.com) - thanks to meteor for the easy deployment using *meteor deploy*, isn't that cool? :)