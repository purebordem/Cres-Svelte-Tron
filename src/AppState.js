//Stores are a very powerful and easy way to share data across your app and can even be customized if need be
//They are generic in nature so they work well with other state management solutions
//We could do all of our pub/sub with the Crestron Control System here in one centralized place

//This demo only uses a store to pass data between the Preset component and the main App
//We could have created props for the Preset component as well

import { writable } from 'svelte/store';

export const presetShow = writable(false)
