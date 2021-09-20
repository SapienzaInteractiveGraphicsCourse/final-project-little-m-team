const c = Math.PI/180;

export const Data = {
    'Astronaut': {
        animations: {
            'Walk': {
                joints: ['Astronaut', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                frames : [
                    [ {y: 10.47}, {y: 10.51}, {y: 10.55}, {y: 10.57},       {y: 10.47}, {y: 10.51}, {y: 10.55}, {y: 10.57}],       // Height

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
                periods: new Array(8).fill(300),
                repeat: true
            },
            'Reset': {
                joints: ['Astronaut', 'rightHip', 'rightKnee', 'rightAnkle', 'leftHip', 'leftKnee', 'leftAnkle', 'rightShoulder', 'rightElbow', 'leftShoulder', 'leftElbow'],
                            //10.5
                frames: [[{y: '+0'}], [{x: 0}], [{x: 0}], [{y: 0}], [{x: 0}], [{x: 0}], [{y: 0}], [{x: 0}], [{x: 0}], [{x: 0}], [{x: 0}]],
                periods: [600],
                repeat: false
            },
            // 'Jump': {
            //     frames: [
            //         [ ]
            //     ],
            // }
        }
    }
}


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
