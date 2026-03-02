export const FABRIC_TYPES = {
    ZEBRA: 'zebra',
    ZEBRA_BLACKOUT: 'zebra_blackout',
    BLACKOUT: 'blackout',
    SCREEN: 'screen',
    UNKNOWN: 'unknown',
} as const;

export const FABRICS = {
    alps_wide: {
        name: 'Alps Wide',
        type: FABRIC_TYPES.ZEBRA,
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
        type: FABRIC_TYPES.ZEBRA,
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
        type: FABRIC_TYPES.ZEBRA,
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
        type: FABRIC_TYPES.ZEBRA_BLACKOUT,
        color: {
            white: 'White',
            ivorly: 'Ivorly',
            light_gray: 'Light Gray',
            dark_gray: 'Dark Gray',
            chocolate: 'Chocolate',
        },
    },
    komfort_blackout: {
        name: 'Komfort Blackout',
        type: FABRIC_TYPES.BLACKOUT,
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
        type: FABRIC_TYPES.BLACKOUT,
        color: {
            white: 'White',
        },
    },
    illusion_aurora: {
        name: 'Illusion Aurora',
        type: FABRIC_TYPES.ZEBRA,
        color: {
            charcoal: 'Charcoal',
        },
    },
    standard_blackout: {
        name: 'Standard Blackout',
        type: FABRIC_TYPES.BLACKOUT,
        color: {
            negro: 'Negro',
        },
    },
} as const;
