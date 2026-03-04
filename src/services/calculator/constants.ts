export const MAX_WIDTH_ROLL_YARDS = 106;

export const FABRIC_TYPES = {
    ZEBRA: ['zebra', 'roller zebra'],
    ZEBRA_BLACKOUT: ['zebra_blackout'],
    BLACKOUT: ['blackout', 'roller blackout'],
    SCREEN: ['screen', 'roller translucent'],
    UNKNOWN: ['unknown'],
} as const;

export const FABRIC_TYPES_VALUES = Object.values(FABRIC_TYPES).flat();

export const FABRICS = {
    alps_wide: {
        name: 'Alps Wide',
        type: FABRIC_TYPES.ZEBRA[0],
        color: {
            ice_white: 'Ice White',
            ivorly: 'Ivorly',
            cream: 'Cream',
            coconut: 'Coconut',
            gray: 'Gray',
        },
    },
    twist: {
        name: 'Twist',
        type: FABRIC_TYPES.ZEBRA[0],
        color: {
            white: 'White',
            ivorly: 'Ivorly',
            sand: 'Sand',
            khaki: 'Khaki',
            mocha: 'Mocha',
            light_gray: 'Light Gray',
        },
    },
    eclipse: {
        name: 'Eclipse',
        type: FABRIC_TYPES.ZEBRA[0],
        color: {
            ice: 'Ice',
            ivory: 'Ivory',
            creme: 'Creme',
            chocolate: 'Chocolate',
            cloud: 'Cloud',
            gray: 'Gray',
        },
    },
    real_blackout_combi: {
        name: 'Real Blackout Combi',
        type: FABRIC_TYPES.ZEBRA_BLACKOUT[0],
        color: {
            white: 'White',
            ivory: 'Ivory',
            light_gray: 'Light Gray',
            dark_gray: 'Dark Gray',
            chocolate: 'Chocolate',
        },
    },
    komfort_blackout: {
        name: 'Komfort Blackout',
        type: FABRIC_TYPES.BLACKOUT[0],
        color: {
            artic: 'Artic',
            apricot: 'Apricot',
            white: 'White',
            vanilla: 'Vanilla',
            graphite: 'Graphite',
            misty: 'Misty',
        },
    },
    genesis_blackout: {
        name: 'Génesis Blackout',
        type: FABRIC_TYPES.BLACKOUT[0],
        color: {
            white: 'White',
        },
    },
    illusion_aurora: {
        name: 'Illusion Aurora',
        type: FABRIC_TYPES.ZEBRA[0],
        color: {
            charcoal: 'Charcoal',
        },
    },
    standard_blackout: {
        name: 'Standard Blackout',
        type: FABRIC_TYPES.BLACKOUT[0],
        color: {
            negro: 'Negro',
        },
    },
    wood_look: {
        name: 'Wood Look',
        type: FABRIC_TYPES.ZEBRA[0],
        color: {
            brown: 'Brown',
        },
    },
    blackout_negro: {
        name: 'Blackout Negro',
        type: FABRIC_TYPES.BLACKOUT[0],
        color: {
            black: 'Black',
        },
    },
    blackout_white: {
        name: 'Blackout White',
        type: FABRIC_TYPES.BLACKOUT[0],
        color: {
            white: 'White',
        },
    },
    uluru: {
        name: 'Uluru',
        type: FABRIC_TYPES.SCREEN[0],
        color: {
            natural: 'Natural',
        },
    },
} as const;
