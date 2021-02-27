# Order Shipping 's frontend
This is built within zero framework, no programing model. It could be hard to read, anyway just enjoy it. 

## Structure 
It is very simple, i don't use any routing method. I just make the folder structure like this, and in every folder, 
i place a `index.html` file. 
- root /index.html 
- home 
    - about
    - contact
    - policy
    - term  
- account
    - signup
    - login
    - forgot-password
    - reset-password  
- app
    - dashboard
    - order
    - products
    - setting
    - shops
    
## Handler

### App.js  

This file is loaded in your app. It handle every thing, rendering navigation bar, binding event for
every single action.  

### Head_foot.js
This file is very simple. It is loaded in every pages in your homepage. It renders
your `header` and `footer` div. 
