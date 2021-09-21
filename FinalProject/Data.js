const c = Math.PI/180;

export const Data = {
    'Astronaut': {
        animations: {
            'Reset': {
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],

                frames: [
                    [{radius: 10.56}],
                    [{x: 0}],
                    [{x: 0}],
                    [{y: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{y: 0}],
                    [{x: 0}],
                    [{x: 0}],
                    [{x: 0, y: 0}],
                    [{x: 0, y: 0}]
                 ],

                periods: [500],
                repeat: false,
                delay: false,
            },
            'nWalk': {
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {radius: 10.47}, {radius: 10.51}, {radius: 10.55}, {radius: 10.57},       {radius: 10.47}, {radius: 10.51}, {radius: 10.55}, {radius: 10.57}],       // Height

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],      // rightHip
                    [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],          // rightKnee
                    [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],       // rightAnkle

                    [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],      // leftHip
                    [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],      // leftKnee
                    [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],         // leftAnkle

                    [ {x: -45*c}, {x: -15*c}, {x: 15*c}, {x: 45*c},     {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c} ],       // rightShoulder
                    [ {x: -90*c}, {x: -90*c}, {x: -75*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],   // rightElbow

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 45*c} ],     // leftShoulder
                    [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ],   // leftElbow
                ],
                periods: new Array(8).fill(500),
                repeat: true,
                delay: false,
                reset: true,
            },
            'Walk': {
                joints: ['radius', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {radius: '+0.15'}, {radius: '+0.15'}, {radius: '-0.15'}, {radius: '-0.15'},       {radius: '+0.15'}, {radius: '+0.15'}, {radius: '-0.15'}, {radius: '-0.15'}],       // Height

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],      // rightHip
                    [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],          // rightKnee
                    [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],       // rightAnkle

                    [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],      // leftHip
                    [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],      // leftKnee
                    [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],         // leftAnkle

                    [ {x: -45*c}, {x: -15*c}, {x: 15*c}, {x: 45*c},     {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c} ],       // rightShoulder
                    [ {x: -90*c}, {x: -90*c}, {x: -75*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],   // rightElbow

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -45*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 45*c} ],     // leftShoulder
                    [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ],   // leftElbow
                ],
                periods: [200, 400, 400, 200, 200, 400, 400, 200],
                repeat: false,
                delay: false,
                reset: true,

            },

            'Jump': {
                joints: ['radius', 'Core', 'upTronco', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames: [
                    [{radius: '-0.16'}, {radius: '+0.16'}, {radius: '+1'}],
                    [{x: 25*c}, {x: 10*c}, {x: 0}],
                    [{x: -15*c}, {x: 0}, {x: -10*c}],

                    [{x: -55*c}, {x: 15*c}, {x: 0}],
                    [{x: 80*c}, {x: -15*c}, {x: 90*c}],
                    [{y: 25*c}, {y: -30*c}, {y: 0}],

                    [{x: -55*c}, {x: 15*c}, {x: 0}],
                    [{x: 80*c}, {x: -15*c}, {x: 90*c}],
                    [{y: 25*c}, {y: -30*c}, {y: 0}],

                    [{x: -30*c}, {x: -90*c}, {x: -150*c}],
                    [{x: -90*c, y: -30*c}, {x: -60*c, y: 0}, {x: -30*c}],

                    [{x: -30*c}, {x: -90*c}, {x: -120*c}],
                    [{x: -90*c, y: -30*c}, {x: -60*c, y: 0}, {x: -45*c}]
                ],

                periods: [500, 300, 500],
                repeat: false,
                delay: [false, 50],
                reset: true,

            },
            'TurnRight': {
                joints: ['root'],
                frames: [[{y: '-0.2'}]],
                periods: [50],
                reset: false,
            },
            'TurnLeft': {
                joints: ['root'],
                frames: [[{y: '+0.2'}]],
                periods: [50],
                reset: false,
            },
        }
    }
}
/*
    MODIFIED Structure:
    Name: [
        [
            {
                joint: 'jointName',
                to: {variable: value},
                period: t
            }
        ]
    ]

*/


// original frames : [
//     [ {y: 10.47}, {y: 10.51}, {y: 10.55}, {y: 10.57},       {y: 10.47}, {y: 10.51}, {y: 10.55}, {y: 10.57} ],       // Height
//
//     [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],      // rightHip
//     [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],          // rightKnee
//     [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],       // rightAnkle
//
//     [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],      // leftHip
//     [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],      // leftKnee
//     [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],         // leftAnkle
//
//     [ {x: -45*c}, {x: -60*c}, {x: 30*c}, {x: 45*c},     {x: 45*c}, {x: 60*c}, {x: 30*c}, {x: 30*c} ],       // rightShoulder
//     [ {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],   // rightElbow
//
//     [ {x: 45*c}, {x: 60*c}, {x: 30*c}, {x: 30*c},       {x: -45*c}, {x: -60*c}, {x: 30*c}, {x: 45*c} ],     // leftShoulder
//     [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ],   // leftElbow
// ],
