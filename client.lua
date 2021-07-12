------------------------------------------------------------------------------
------------------------ SCRIPT DESENVOLVIDO POR -----------------------------
-------------------------------- DROYEN --------------------------------------
----------------------- ENCOMENDAS EM droyen#1563 ----------------------------
------------ MAIS PRODUTOS EM:https://discord.gg/HNAChDZ68f ------------------
------------------------------------------------------------------------------


local Tunnel = module('vrp','lib/Tunnel')
local Proxy = module('vrp','lib/Proxy')
vRP = Proxy.getInterface('vRP')
a = GetCurrentResourceName()
inventory = Tunnel.getInterface('vrp_inventory')
b = 'dyn'
droyenFunc = Tunnel.getInterface('droyen-craft:server')
c = b..'_craft'

RegisterCommand('craftMenu',function()
    if d == a then
        SetNuiFocus(true,true)
        TransitionToBlurred(1000)
        SendNUIMessage({openMenu = true})
    end
end)

RegisterKeyMapping('craftMenu','Usúario - Fabricação','keyboard','F3')


RegisterNUICallback('updateInventory',function(data,cb)
    local inventario = inventory.Mochila()
    if inventario then
        cb({inventario = inventario})
    end
end)
d = c..'ing'

verificacaoCraft = {}

RegisterNUICallback('verificarCraft',function(data,cb)
    local boxItens = json.decode(data.boxItens)
    for k,v in pairs(craftableItens) do
        for i = 1,9 do
            if v['box'..tostring(i)][1] == boxItens[i][1] and v['box'..tostring(i)][2] == boxItens[i][2] then
                table.insert(verificacaoCraft,{boxItens[i][1],boxItens[i][2]})
                if i == 9 then
                    if droyenFunc.craftarItem(verificacaoCraft,v['permission'],k,v['amount']) == false then
                        permissao = 'Você não tem permissao para fazer este item!'
                    else
                        permissao = 'Item craftado com sucesso!'
                    end    
                    cb({itemCriado = droyenFunc.itemName(k),indexItem = k,qtdItem = v['amount'],statusCraft = permissao})
                end
            else
                break
            end
        end
    end

    verificacaoCraft = {}

end)

RegisterNUICallback('exit',function()
    SetNuiFocus(false,false)
    TransitionFromBlurred(1000)
    SendNUIMessage({ openMenu = false })
end)

------------------------------------------------------------------------------
------------------------ SCRIPT DESENVOLVIDO POR -----------------------------
-------------------------------- DROYEN --------------------------------------
----------------------- ENCOMENDAS EM droyen#1563 ----------------------------
------------ MAIS PRODUTOS EM:https://discord.gg/HNAChDZ68f ------------------
------------------------------------------------------------------------------