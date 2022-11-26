local cam = nil
local lastloc = {}
local wait = nil
-- @ coord = {x = 50.0, y = 125.1, z = 50.0, heading = 2.0} - x,y,z, headings (for last locations)
exports('Selector', function(coord)
	wait = promise.new()
	DoScreenFadeOut(1)
	Wait(1000)
	DoScreenFadeIn(1)

	if coord then
		lastloc = vec4(coord.x,coord.y,coord.z,coord.heading or 0.0)
	else
		local coord = GetEntityCoords(PlayerPedId())
		lastloc = vec4(coord.x,coord.y,coord.z,coord.heading or 0.0)
	end
	local PlayerData = GetEntityCoords(PlayerPedId())
	cam = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", PlayerData.x, PlayerData.y, PlayerData.z + 800.0, -85.00, 0.00, 0.00, 100.00, false, 0)
	SetCamActive(cam, true)
	RenderScriptCams(true, false, 1, true, true)
	SetNuiFocus(true,true)
	SendNUIMessage({spawns = Config.Spawns})
	return Citizen.Await(wait)
end)

RegisterCommand('spawn', function()
	local coord = GetEntityCoords(PlayerPedId())
	exports.renzu_spawn:Selector({x = coord.x, y = coord.y, z = coord.z, heading = 0.0})
end)

preview = function(name)
	local spawns = Config.Spawns
	for i = 1 , #spawns do
		if spawns[i].name == name then
			SetCamParams(cam, spawns[i].coord.x, spawns[i].coord.y, spawns[i].coord.z + 800.0, -85.00, 0.00, 0.00, 100.00, 1000, 0, 0, 2)
			SetFocusPosAndVel(spawns[i].coord.x, spawns[i].coord.y, spawns[i].coord.z)
			while #(GetFinalRenderedCamCoord() - vec3(spawns[i].coord.x, spawns[i].coord.y, spawns[i].coord.z + 800.0)) > 10 do Wait(111) end
			SetCamParams(cam, spawns[i].coord.x, spawns[i].coord.y, spawns[i].coord.z + 50, -85.00, 0.00, 0.00, 100.00, 2000, 0, 0, 2)
			break
		end
	end
end

spawn = function(name)
	if name == 'lastloc' then
		SetCamParams(cam, lastloc.x, lastloc.y, lastloc.z + 800.0, -85.00, 0.00, 0.00, 100.00, 1, 0, 0, 2)
		PlayerSpawn(lastloc)
	end
	local spawns = Config.Spawns
	for i = 1 , #spawns do
		if spawns[i].name == name then
			PlayerSpawn(spawns[i].coord)
			break
		end
	end
	wait:resolve(name)
end

PlayerSpawn = function(coord)
	SendNUIMessage({close = true})
	SetNuiFocus(false,false)
	local ped = PlayerPedId()
	FreezeEntityPosition(ped, true)
	SetCamParams(cam, coord.x, coord.y, coord.z+4.2, -85.00, 0.00, 0.00, 50.00, 2000, 0, 0, 2)
	Wait(2000)
	local coord = vec4(coord.x, coord.y, coord.z, coord.w)
	SetFocusPosAndVel(coord.x,coord.y,coord.z)
	RequestCollisionAtCoord(coord.x,coord.y,coord.z)
	SetEntityCoords(ped,coord.x,coord.y,coord.z-0.9)
	SetEntityHeading(ped,coord.w)
	SetFocusEntity(ped)
	SetCamParams(cam, coord.x+0.5, coord.y-7, coord.z, 0.00, 0.00, 0.00, 20.00, 1000, 0, 0, 2)
	Wait(2000)
	RenderScriptCams(false, true, 3000, true, true)
	while not HasCollisionLoadedAroundEntity(ped) do Wait(1) end
	FreezeEntityPosition(ped, false)
	Wait(3000)
	if DoesCamExist(cam) then
		SetCamActive(cam, false)
	end
end

-- NUI CALLBACKS
RegisterNUICallback('nuicb', function(data)
	if data.msg == 'preview' then
		preview(data.name)
	end
	if data.msg == 'spawn' then
		spawn(data.name)
	end
end)