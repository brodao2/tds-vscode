#include "protheus.ch"
//#include "bogus"

user function lg2Kline(arg1, arg2)
    local tst1k := "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac."

    local tst2k := "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac."

    local tst8k := "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac." ;
    + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac." ;
    + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac." ;
    + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac."

    local tst2k2 := "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed commodo libero. Nunc in convallis mauris. Aliquam varius sagittis quam, ac sodales turpis scelerisque vitae. Donec tellus neque, consectetur quis iaculis eu, posuere non ex. Nullam id suscipit velit. In gravida a dolor et vulputate. Phasellus ac orci ut odio venenatis laoreet. Etiam et felis eros. In tempus dignissim risus. Nulla facilisis suscipit malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dictum nulla diam, ut viverra odio commodo id. Sed posuere justo sed elit aliquam fringilla eu nec nisl. Suspendisse at sagittis neque, pharetra sollicitudin eros. Praesent a risus tincidunt, iaculis felis quis, tristique metus. Ut semper sem sed sapien interdum, eget ultricies lectus blandit. In lacus quam, malesuada non cursus eu, feugiat in nunc. Donec nulla metus, congue non sem sed, elementum pretium ex. Integer vitae tincidunt lectus, eget venenatis metus. Aliquam tincidunt, mauris ac."

    local cTitle := 'titulo'
    local cText := 'plain text acentua��o'
    //MsgAlert(cText, cTitle)

    MsgAlert(arg1, arg2)

    conout(tst1k)
    conout(tst2k)
    conout(tst8k)
  return
