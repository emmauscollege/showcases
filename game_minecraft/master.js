const g = {};
g.c = undefined;
g.c2 = undefined;
g.playTime = 0;
g.messages = [];
g.settings = {framerate: false};
g.gameState = "startScreen"
g.gameMode = "creative"
g.level = 0; //level = 1 is eerste level, level = 0 alleen voor creative mode
g.touchedBlocks = []
g.timeOfLavaHit = 0;
g.maxTimeOfLavaHit = 1500;
g.inventory = []
g.selectedInventoryItem = 0
g.keysHit = {r: "false"}
g.mineTimer = undefined
g.blocks = undefined
g.blockSize = 100
g.acceleration = .03
g.maxGlobalSpeed = 15
g.sensitivity = 1
g.gravity = .6
g.renderDistance = 1500
g.currentSpeed = {y: 0, x: 0, z: 0}
g.cameraPos = {position: [0, -1000, 0], orientation: [135,0]}
