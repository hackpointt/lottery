class DataProvider {

    winning = {
        1: [[6, 6, 6, 7, 1, 8, 8, 8, 8]],
        2: [[6, 6, 6, 8, 9, 6, 8, 8, 8], [6, 6, 6, 6, 4, 1, 8, 8, 8]],
        3: [[6, 6, 6, 1, 4, 0, 8, 8, 8], [6, 6, 6, 0, 7, 7, 8, 8, 8], [6, 6, 6, 9, 3, 3, 8, 8, 8]],
        4: [[6, 6, 6, 9, 2, 1, 8, 8, 8], [6, 6, 6, 5, 8, 5, 8, 8, 8], [6, 6, 6, 7, 1, 3, 8, 8, 8], [6, 6, 6, 0, 2, 1, 8, 8, 8]],
        5: [[6, 6, 6, 1, 2, 3, 8, 8, 8], [6, 6, 6, 6, 4, 2, 8, 8, 8], [6, 6, 6, 7, 8, 0, 8, 8, 8], [6, 6, 6, 1, 9, 9, 8, 8, 8], [6, 6, 6, 3, 2, 0, 8, 8, 8]],
        6: [[6, 6, 6, 5, 4, 6, 8, 8, 8], [6, 6, 6, 6, 0, 5, 8, 8, 8], [6, 6, 6, 5, 6, 7, 8, 8, 8], [6, 6, 6, 1, 4, 9, 8, 8, 8], [6, 6, 6, 6, 5, 3, 8, 8, 8],
            [6, 6, 6, 5, 5, 5, 8, 8, 8], [6, 6, 6, 6, 9, 9, 8, 8, 8]],
        7: [[6, 6, 6, 5, 7, 4, 8, 8, 8], [6, 6, 6, 1, 7, 2, 8, 8, 8], [6, 6, 6, 0, 5, 4, 8, 8, 8], [6, 6, 6, 2, 3, 0, 8, 8, 8], [6, 6, 6, 7, 4, 1, 8, 8, 8],
            [6, 6, 6, 8, 8, 8, 8, 8, 8], [6, 6, 6, 7, 9, 9, 8, 8, 8], [6, 6, 6, 0, 9, 3, 8, 8, 8], [6, 6, 6, 0, 1, 9, 8, 8, 8]],
        8: [[6, 6, 6, 0, 1, 0, 8, 8, 8], [6, 6, 6, 8, 2, 5, 8, 8, 8], [6, 6, 6, 7, 9, 0, 8, 8, 8], [6, 6, 6, 7, 1, 7, 8, 8, 8], [6, 6, 6, 4, 9, 7, 8, 8, 8],
            [6, 6, 6, 9, 3, 7, 8, 8, 8], [6, 6, 6, 1, 0, 0, 8, 8, 8], [6, 6, 6, 7, 2, 3, 8, 8, 8], [6, 6, 6, 5, 9, 5, 8, 8, 8], [6, 6, 6, 1, 5, 0, 8, 8, 8],
            [6, 6, 6, 7, 2, 8, 8, 8, 8], [6, 6, 6, 2, 5, 5, 8, 8, 8]]
    }
    drawers = {
        1: "张天平",
        2: "李灿",
        3: "张林玉",
        4: "王浩博",
        5: "蒲晓艳",
        6: "赵潘",
        7: "程钦应",
        8: "蒲俊錚",
        9: "李维春",
        10: "严伟",
        11: "罗心怡",
        12: "张建涛",
        13: "巩兵",
        14: "赵磊",
        15: "陈超",
        16: "曹翔",
        17: "刘和林",
        18: "甘士成",
        19: "高凌云",
        20: "陈海荣",
        21: "邓丽琼",
        22: "张琪",
        23: "张建",
        24: "彭鑫",
        25: "史厚玲",
        26: "马鹤轩",
        27: "王海容",
        28: "王艺璇",
        29: "王瑞",
        30: "吴诗涛",
        31: "周俊",
        32: "刘畅",
        33: "邓海涛",
        34: "陈敏",
        35: "邓静",
        36: "向伟",
        37: "苟长霞",
        38: "杨蕾",
        39: "聂小玲",
        40: "谭秋菊",
        41: "王亮",
        42: "董欢欢",
        43: "何灵",
        44: "?"
    }
    drawnNumbers = {}
    drawGroups = []
    index = 0
    indexes = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    }
    updateIndex(level) {
        this.indexes[level] = this.indexes[level] + 1
    }
    constructor() {
        this.drawGroups = this.genDrawerOrder(43)
    }

    drawerNo2Name(drawerNo) {

        const result = this.drawers[drawerNo]
        if (result === undefined) {
            return "?"
        }
        return result
    }

    genDrawerOrder(n) {
        const numbers = Array.from({length: n}, (_, index) => index + 1);

        numbers.sort(() => Math.random() - 0.5);

        const totalNumbers = numbers.length;
        const groupsCount = 7;
        const averagePerGroup = Math.floor(totalNumbers / groupsCount);
        const remainingNumbers = totalNumbers % groupsCount;

        const groups = Array.from({length: groupsCount}, () => []);

        let currentIndex = 0;
        for (let i = 0; i < groupsCount; i++) {
            const groupSize = averagePerGroup + (i >= groupsCount - remainingNumbers ? 1 : 0);
            groups[i] = numbers.slice(currentIndex, currentIndex + groupSize);
            currentIndex += groupSize;
        }
        return groups
    }

    fetchData(level) {
        console.log("dataProvider fetchData level: " + level)
        this.data = this.winning[level]
    }
}

function genOrder(number, targetGroupIndex, positionInGroup, groups) {
    let sourceGroupIndex;
    let sourceGroup;
    let sourceIndex;

    for (let i = 0; i < groups.length; i++) {
        if (groups[i].includes(number)) {
            sourceGroupIndex = i;
            sourceGroup = groups[i];
            sourceIndex = sourceGroup.indexOf(number);
            break;
        }
    }

    const targetGroup = groups[targetGroupIndex];

    if (sourceGroupIndex === undefined || sourceGroup === undefined || sourceIndex === undefined) {
        console.log(`编号 ${number} 不存在于任何组中`);
        return;
    }

    if (targetGroup === undefined || targetGroupIndex >= groups.length) {
        console.log(`目标组索引 ${targetGroupIndex} 无效`);
        return;
    }

    if (positionInGroup < 0 || positionInGroup >= targetGroup.length) {
        console.log(`位置 ${positionInGroup} 无效`);
        return;
    }

    const temp = sourceGroup[sourceIndex];
    sourceGroup[sourceIndex] = targetGroup[positionInGroup];
    targetGroup[positionInGroup] = temp;
}


export default DataProvider