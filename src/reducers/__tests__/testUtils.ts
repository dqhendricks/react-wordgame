import type { GameState } from "../../types.ts";

export function createMockGameState(): GameState {
  return {
    status: "active",
    stage: 0,
    totalStages: 2,
    stageData: {
      rowCount: 7,
      columnCount: 10,
      letters: ["a", "e", "i", "d", "c", "t", "r"],
      words: [
        {
          word: "tried",
          startPos: {
            x: 4,
            y: 4,
          },
          orientation: "x",
        },
        {
          word: "care",
          startPos: {
            x: 2,
            y: 2,
          },
          orientation: "x",
        },
        {
          word: "cater",
          startPos: {
            x: 7,
            y: 1,
          },
          orientation: "y",
        },
        {
          word: "cited",
          startPos: {
            x: 0,
            y: 6,
          },
          orientation: "x",
        },
        {
          word: "dice",
          startPos: {
            x: 2,
            y: 0,
          },
          orientation: "y",
        },
        {
          word: "cat",
          startPos: {
            x: 7,
            y: 1,
          },
          orientation: "x",
        },
        {
          word: "crated",
          startPos: {
            x: 4,
            y: 1,
          },
          orientation: "y",
        },
      ],
    },
    gameGrid: [
      [
        {
          id: 0.11453984552270602,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.038574932409537466,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.6323313365320291,
          status: "hidden",
          letter: "d",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.15686792142576933,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.7668033007165895,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.38163489747946144,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.5438945511179243,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.6178532189909076,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.9665419917879337,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.776290737089105,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
      ],
      [
        {
          id: 0.3217019306296187,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.15208657926743707,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.7623666187835496,
          status: "hidden",
          letter: "i",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.9505483017164873,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.5396518382982562,
          status: "hidden",
          letter: "c",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.4562217061092315,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.7041272272722137,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.16591643306721826,
          status: "hidden",
          letter: "c",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.33184215929035865,
          status: "hidden",
          letter: "a",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.20266596107684287,
          status: "hidden",
          letter: "t",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
      ],
      [
        {
          id: 0.9858384855573072,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.9239092037227297,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.5562561297492443,
          status: "hidden",
          letter: "c",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.5206789857049605,
          status: "hidden",
          letter: "a",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.6071881728081534,
          status: "hidden",
          letter: "r",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.34503153264889863,
          status: "hidden",
          letter: "e",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.9859502610125781,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.43732294987597164,
          status: "hidden",
          letter: "a",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.1961772002609583,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.1861795719698225,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
      ],
      [
        {
          id: 0.5117193006769465,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.12309738395997827,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.5593468042540211,
          status: "hidden",
          letter: "e",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.6785705373705557,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.47810844745771064,
          status: "hidden",
          letter: "a",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.7099392872430881,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.8256402148518556,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.1077335465086211,
          status: "hidden",
          letter: "t",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.00825772193648211,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.2603023476738222,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
      ],
      [
        {
          id: 0.6324951505904626,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.4247973635645783,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.5555192545913521,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.9397487724674451,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.022865710546023044,
          status: "hidden",
          letter: "t",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.7486818185425426,
          status: "hidden",
          letter: "r",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.5439864626131699,
          status: "hidden",
          letter: "i",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.6456336461179397,
          status: "hidden",
          letter: "e",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.02989151034195614,
          status: "hidden",
          letter: "d",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.17941863043409323,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
      ],
      [
        {
          id: 0.8335770364751738,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.21906921296564308,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.2745059333825963,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.43329644982865845,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.8847968327620397,
          status: "hidden",
          letter: "e",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.018881623043204288,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.06502019937440373,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.5535013199588401,
          status: "hidden",
          letter: "r",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.6173591628255823,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.3836093477679168,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
      ],
      [
        {
          id: 0.4062680696336669,
          status: "hidden",
          letter: "c",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.0756625055429152,
          status: "hidden",
          letter: "i",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.6390738357695436,
          status: "hidden",
          letter: "t",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.35779607873585784,
          status: "hidden",
          letter: "e",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.05067562543944004,
          status: "hidden",
          letter: "d",
          animateVariant: "",
          ref: {
            current: null,
          },
        },
        {
          id: 0.9247731845176843,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.24087904297393847,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.06402298875849355,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.9752605950403352,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
        {
          id: 0.05966590650374726,
          status: "empty",
          letter: "",
          animateVariant: "",
        },
      ],
    ],
    selectedLettersData: {
      currentSlotIndex: 0,
      animateVariant: "",
      selectedLetters: [
        {
          id: 0.4223103052646744,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
        {
          id: 0.918417994063051,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
        {
          id: 0.5398012461116615,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
        {
          id: 0.17506901081009918,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
        {
          id: 0.3789268470722109,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
        {
          id: 0.01060418011702402,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
        {
          id: 0.5197923065398342,
          status: "hidden",
          letter: "",
          ref: {
            current: null,
          },
          animateVariant: "",
        },
      ],
    },
    availableLetters: [
      {
        id: 0.46654092556961224,
        letter: "a",
        disabled: false,
      },
      {
        id: 0.05443847159397519,
        letter: "e",
        disabled: false,
      },
      {
        id: 0.3780694130282527,
        letter: "i",
        disabled: false,
      },
      {
        id: 0.5991393273134424,
        letter: "d",
        disabled: false,
      },
      {
        id: 0.3688513821788204,
        letter: "c",
        disabled: false,
      },
      {
        id: 0.35244519878597225,
        letter: "t",
        disabled: false,
      },
      {
        id: 0.6448187386959534,
        letter: "r",
        disabled: false,
      },
    ],
    foundWords: [],
  };
}
