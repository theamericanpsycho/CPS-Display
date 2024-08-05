import * as b from "@minecraft/server";

const playerHits = {};
const playerCPS = {};

b.system.runInterval(() => {
    for (const playerId in playerHits) {
        playerCPS[playerId] = playerHits[playerId];
        playerHits[playerId] = 0;
    }
    updatePlayerNames();
}, 20);

b.world.afterEvents.entityHitEntity.subscribe((event) => {
    const attacker = event.damagingEntity;

    if (attacker.typeId === "minecraft:player") {
        if (!playerHits[attacker.id]) {
            playerHits[attacker.id] = 1;
        } else {
            playerHits[attacker.id]++;
        }
    }
});

function updatePlayerNames() {
    for (const player of b.world.getAllPlayers()) {
        const cps = playerCPS[player.id] || 0;
        player.nameTag = `${player.name} |  ${cps}`;
    }
}