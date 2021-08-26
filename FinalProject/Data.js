const c = Math.PI/180;

export const Data = {
    astronaut: {
        joints: [8, 51, 53, 55, 58, 60, 62, 18, 20, 30, 32],
        animations: {
            'Walk': {
                frames : [
                    [ {y: 0.47}, {y: 0.51}, {y: 0.55}, {y: 0.57},       {y: 0.47}, {y: 0.51}, {y: 0.55}, {y: 0.57} ],       // Height

                    [ {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c},      {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c} ],      // rightLeg.Anca
                    [ {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c},      {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c} ],          // rightLeg.Ginocchio
                    [ {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c},         {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c} ],       // rightLeg.Caviglia

                    [ {x: -35*c}, {x: -30*c}, {x: 5*c}, {x: 15*c},      {x: 15*c}, {x: 0*c}, {x: -30*c}, {x: -60*c} ],      // leftLeg.Anca
                    [ {x: 0*c}, {x: 45*c}, {x: 5*c}, {x: 0*c},          {x: 30*c}, {x: 90*c}, {x: 120*c}, {x: 90*c} ],      // leftLeg.Ginocchio
                    [ {y: 0*c}, {y: 15*c}, {y: 10*c}, {y: -15*c},       {y: 40*c}, {y: 0*c}, {y: 30*c}, {y: 0*c} ],         // leftLeg.Caviglia

                    [ {x: -45*c}, {x: -60*c}, {x: 30*c}, {x: 45*c},     {x: 45*c}, {x: 60*c}, {x: 30*c}, {x: 30*c} ],       // rightArm.Spalla
                    [ {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c},   {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c} ],   // rightArm.Gomito

                    [ {x: 45*c}, {x: 60*c}, {x: 30*c}, {x: 30*c},       {x: -45*c}, {x: -60*c}, {x: 30*c}, {x: 45*c} ],     // leftArm.Spalla
                    [ {x: -45*c}, {x: -45*c}, {x: -90*c}, {x: -90*c},   {x: -90*c}, {x: -90*c}, {x: -90*c}, {x: -75*c} ]    // leftArm.Gomito
                ],
                periods: [100]*8,
                repeat: true
            },
            'Reset': {
                frames: [[{y: 0.5}], [{x: 0}], [{x: 0}], [{y: 0}], [{x: 0}], [{x: 0}], [{y: 0}], [{x: 0}], [{x: 0}], [{x: 0}], [{x: 0}]],
                periods: [300],
                repeat: false
            }
        }
    }
}
