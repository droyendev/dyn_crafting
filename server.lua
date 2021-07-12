------------------------------------------------------------------------------
------------------------ SCRIPT DESENVOLVIDO POR -----------------------------
-------------------------------- DROYEN --------------------------------------
----------------------- ENCOMENDAS EM droyen#1563 ----------------------------
------------ MAIS PRODUTOS EM:https://discord.gg/HNAChDZ68f ------------------
------------------------------------------------------------------------------

local Tunnel = module('vrp','lib/Tunnel')
local Proxy = module('vrp','lib/Proxy')
vRP = Proxy.getInterface('vRP')

droyen = {}
Tunnel.bindInterface('droyen-craft:server',droyen)

function droyen.itemName(index)
    return vRP.itemNameList(index)
end

function droyen.craftarItem(tabela,permissao,item,quantia)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        if permissao ~= nil then
            if vRP.hasPermission(user_id, permissao) then
                for k,v in pairs(tabela) do
                    vRP.tryGetInventoryItem(user_id,v[1],v[2])
                end
                vRP.giveInventoryItem(user_id,item,quantia,true,slot)
                return true
            else
                return false
            end
        else
            for k,v in pairs(tabela) do
                vRP.tryGetInventoryItem(user_id,v[1],v[2])
            end
            vRP.giveInventoryItem(user_id,item,quantia,true,slot)
            return true
        end
    end
end

------------------------------------------------------------------------------
------------------------ SCRIPT DESENVOLVIDO POR -----------------------------
-------------------------------- DROYEN --------------------------------------
----------------------- ENCOMENDAS EM droyen#1563 ----------------------------
------------ MAIS PRODUTOS EM:https://discord.gg/HNAChDZ68f ------------------
------------------------------------------------------------------------------
