## react-web-h5

* Bale 'webpack@4 + babel'
* Eslint 'airbnb + babel-eslint'
* Ui 'react@16 + antd-mobile + styled-components'
* Router 'react-router-dom@4 + history@4'
* Xhr 'axios'
* Handle state 'mbox'
* Other library '...'


### Version
```html
node 8.0+(v8.12.0)
npm 5.0+(v6.4.1)
```

### Dos development
1. Run 'yarn'
2. Run 'yarn start'


### Dos production
* Run 'yarn build'

* OR

* Run 'yarn build:(any)'


### Project structure
```html
|--src              Source dir
  |--assets         Static source
  |--components     Only common & Layout
  |--constants      
  |--mock           Xhr mock func
  |--models         Mobx store
  |--pages          Container & Self component
  |--services       Xhr api
  |--styles         Common styles
  |--utils          
  |--index.js       Entry of Program
  |--router.js      Top Router        

|--.env-cmdrc       Base url config
```
