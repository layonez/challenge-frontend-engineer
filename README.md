# Tech choice justification
- CRA - not my default choice for anything except quick POC, but for something with a timeline of a couple of hours its rational to avoid bundler configuration 
- CSS modules - simplistic and scalable, zero runtime. Real ccs that served to users are available for modification a debugging 😍 
- react-router-dom just works 
- typescript-plugin-css-modules allows nice integration with CSS files contents, with a bit of a modification can provide dead classes removal functionality 

# Solution overview

In 3h I was pretty close to making the sign-in form look and functionality close to production standard. But decided not to continue with OrderDetailPage because of a time limit

- optimistic form validation implemented via useUncontrolledOrderTrackingForm hook. We do not distract users with error messages until the form is submitted and at the same time error messages are gone on blur event if possible. That should bring joy to UX
- data handling is done with optimal UX in mind too. We keep valid order data in the location state, so page refresh or back/forward browser navigation should not re-trigger any API requests and OrderDatailPage should be rendered instantly
- on the form itself space is reserved for error messages, so doing regular user flow it would be not possible to see any CLS. At the same time, if we would have longer error messages - the form will adjust, as showing proper messages is a priority
- basics of the design system (Spacings, colors) are implemented via ccs variables in ./index.css
- UI-kit components are expected to be in the components folder
- complex form handling logic is split between useUncontrolledOrderTrackingForm and ApiService
- core functionality of SignInPage has proper unit test coverage

# How to run

- nvm use
- npm i
- npm start
- go to http://localhost:3000/