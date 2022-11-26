# 🛸 renzu_spawn
Fivem - Spawn Selector
a simple standalone spawn selector
![image](https://forum.cfx.re/uploads/default/original/4X/f/5/3/f53b64aefcc57e56229eaaadd1f51cd3431fa324.gif)


# 📥 Download 
https://github.com/renzuzu/renzu_spawn

# 💥 Feature

* Easy to add and remove locations via config
* Trigger the resource via Exports.
* Smooth Camera Transition
* Standalone resource
* Supports non multicharacters too. by editing Config.multicharacters = false
* Supports Custom location like personal property, job locations.

# ℹ️ How to use
- this resource can be exported from your eg. multicharacters resource.
```
local lastlocation = {x = coord.x, y = coord.y, z = coord.z, heading = coord.w}
exports.renzu_spawn:Selector(lastlocation)
```
- if Config.multicharacters is false. this Spawn Selector will show up when you spawned in the first time using spawnmanager events handler.

# Custom Spawn locations
- you can define custom locations eg. job locations, personal locations
```
local lastlocation = {x = coord.x, y = coord.y, z = coord.z, heading = coord.w}
local options = {
  [1] = { 
             name = 'house',  -- img name
             label = 'Personal Property', 
             coord = vector4(146.86, -267.63, 43.28, 142.27), 
             info = 'My Personal property in grove street.'
   },
}
exports.renzu_spawn:Selector(lastlocation,options)
```
