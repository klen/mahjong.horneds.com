module.exports =

    yaku: [
        { name: '1 han',   value: 1 }
        { name: '2 han',   value: 2 }
        { name: '3 han',   value: 3 }
        { name: '4 han',   value: 4 }
        { name: '5 han',   value: 5 }
        { name: '6 han',   value: 6 }
        { name: '7 han',   value: 7 }
        { name: '8 han',   value: 8 }
        { name: '9 han',   value: 9 }
        { name: '10 han',  value: 10 }
        { name: '11 han',  value: 11 }
        { name: '12 han',  value: 12 }
        { name: '13+ han', value: 13 }
    ]

    scores:
        east:
            fans: [
                [
                    null,
                    { name: '1500 (500)',  value: 1500, cls: "u-bg-blue-l" },
                    { name: '2000 (700)',  value: 2000, cls: "u-bg-green-l" },
                    { name: '2400 (800)',  value: 2400, cls: "u-bg-green-l" },
                    { name: '2900 (1000)', value: 2900, cls: "u-bg-green-l" },
                    { name: '3400 (1200)', value: 3400 },
                    { name: '3900 (1300)', value: 3900, cls: "u-bg-red-l" },
                    { name: '4400 (1500)', value: 4400 },
                    { name: '4800 (1600)', value: 4800, cls: "u-bg-red-l" },
                    { name: '5300 (1800)', value: 5300 },
                ],
                [
                    { name: '2000 (700)',  value: 2000, cls: "u-bg-green-l" },
                    { name: '2900 (1000)', value: 2900, cls: "u-bg-green-l" },
                    { name: '3900 (1300)', value: 3900, cls: "u-bg-red-l" },
                    { name: '4800 (1600)', value: 4800, cls: "u-bg-red-l" },
                    { name: '5800 (2000)', value: 5800, cls: "u-bg-red-l" },
                    { name: '6800 (2300)', value: 6800 },
                    { name: '7700 (2600)', value: 7700, cls: "u-bg-orange-l" },
                    { name: '8700 (2900)', value: 8700 },
                    { name: '9600 (3200)', value: 9600, cls: "u-bg-orange-l" },
                    { name: '10600 (3600)', value: 10600 },
                ],
                [
                    { name: '3900 (1300)', value: 3900, cls: "u-bg-red-l" },
                    { name: '5800 (2000)', value: 5800, cls: "u-bg-red-l" },
                    { name: '7700 (2600)', value: 7700, cls: "u-bg-orange-l" },
                    { name: '9600 (3200)', value: 9600, cls: "u-bg-orange-l" },
                    { name: '11600 (3900)', value: 11600, cls: "u-bg-orange-l" },
                    null, null, null, null, null
                ],
                [
                    { name: '7700 (2600)', value: 7700, cls: "u-bg-orange-l" },
                    { name: '11600 (3900)', value: 11600, cls: "u-bg-orange-l" },
                    null, null, null, null, null, null, null, null
                ],
            ]
            limits: [
                { name: '12000 (4000)',  value: 12000 }
                { name: '18000 (6000)',  value: 18000 }
                { name: '24000 (8000)',  value: 24000 }
                { name: '36000 (12000)', value: 36000 }
                { name: '48000 (16000)', value: 48000 }
            ]

        other:
            fans: [
                [
                    null,
                    { name: '1000 (500/300)',  value: 1000, cls: "u-bg-blue-l" },
                    { name: '1300 (700/400)',  value: 1300, cls: "u-bg-green-l" },
                    { name: '1600 (800/400)',  value: 1600, cls: "u-bg-orange-l" },
                    { name: '2000 (1000/500)', value: 2000, cls: "u-bg-red-l" },
                    { name: '2300 (1200/600)', value: 2300 },
                    { name: '2600 (1300/700)', value: 2600, cls: "u-bg-green-l" }
                    { name: '2900 (1500/800)', value: 2900 }
                    { name: '3200 (1600/800)', value: 3200, cls: "u-bg-orange-l" }
                    { name: '3600 (1800/900)', value: 3600 }
                ],
                [
                    { name: '1300 (700/400)',  value: 1300, cls: "u-bg-green-l" },
                    { name: '2000 (1000/500)', value: 2000, cls: "u-bg-red-l" },
                    { name: '2600 (1300/700)', value: 2600, cls: "u-bg-green-l" }
                    { name: '3200 (1600/800)', value: 3200, cls: "u-bg-orange-l" }
                    { name: '3900 (2000/1000)', value: 3900, cls: "u-bg-red-l" }
                    { name: '4500 (2300/1200)', value: 4500 }
                    { name: '5200 (2600/1300)', value: 5200, cls: "u-bg-green-l" }
                    { name: '5800 (2900/1500)', value: 5800 }
                    { name: '6400 (3200/1600)', value: 6400, cls: "u-bg-orange-l" }
                    { name: '7100 (3600/1800)', value: 7100 }
                ],
                [
                    { name: '2600 (1300/700)', value: 2600, cls: "u-bg-green-l" }
                    { name: '3900 (2000/1000)', value: 3900, cls: "u-bg-red-l" }
                    { name: '5200 (2600/1300)', value: 5200, cls: "u-bg-green-l" }
                    { name: '6400 (3200/1600)', value: 6400, cls: "u-bg-orange-l" }
                    { name: '7700 (3900/2000)', value: 7700, cls: "u-bg-red-l" }
                    null, null, null, null, null
                ],
                [
                    { name: '5200 (2600/1300)', value: 5200, cls: "u-bg-green-l" }
                    { name: '7700 (3900/2000)', value: 7700, cls: "u-bg-red-l" }
                    null, null, null, null, null, null, null, null
                ]
            ]
            limits: [
                { name: '8000 (4000/2000)',   value: 8000 }
                { name: '12000 (6000/3000)',  value: 12000 }
                { name: '16000 (8000/4000)',  value: 16000 }
                { name: '24000 (12000/6000)', value: 24000 }
                { name: '32000 (16000/8000)', value: 32000 }
            ]

    scores2:

        east: [
            { name: '1500 (500)',    value: 1500 }
            { name: '2000 (700)',    value: 2000 }
            { name: '2400 (800)',    value: 2400 }
            { name: '2900 (1000)',   value: 2900 }
            { name: '3400 (1200)',   value: 3400 }
            { name: '3900 (1300)',   value: 3900 }
            { name: '4400 (1500)',   value: 4400 }
            { name: '4800 (1600)',   value: 4800 }
            { name: '5300 (1800)',   value: 5300 }
            { name: '5800 (2000)',   value: 5800 }
            { name: '6800 (2300)',   value: 6800 }
            { name: '7700 (2600)',   value: 7700 }
            { name: '8700 (2900)',   value: 8700 }
            { name: '9600 (3200)',   value: 9600 }
            { name: '10600 (3600)',  value: 10600 }
            { name: '11600 (3900)',  value: 11600 }
            { name: '12000 (4000)',  value: 12000 }
            { name: '18000 (6000)',  value: 18000 }
            { name: '24000 (8000)',  value: 24000 }
            { name: '36000 (12000)', value: 36000 }
            { name: '48000 (16000)', value: 48000 }
        ]

        other: [
            { name: '1000 (500/300)',     value: 1000 }
            { name: '1300 (700/400)',     value: 1300 }
            { name: '1600 (800/400)',     value: 1600 }
            { name: '2000 (1000/500)',    value: 2000 }
            { name: '2300 (1200/600)',    value: 2300 }
            { name: '2600 (1300/700)',    value: 2600 }
            { name: '2900 (1500/800)',    value: 2900 }
            { name: '3200 (1600/800)',    value: 3200 }
            { name: '3600 (1800/900)',    value: 3600 }


            { name: '7700 (3900/2000)',   value: 7700 }
            { name: '8000 (4000/2000)',   value: 8000 }
            { name: '12000 (6000/3000)',  value: 12000 }
            { name: '16000 (8000/4000)',  value: 16000 }
            { name: '24000 (12000/6000)', value: 24000 }
            { name: '32000 (16000/8000)', value: 32000 }
        ]
