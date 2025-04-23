// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// export default defineConfig({
//   plugins: [react()],
//   base: './',
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis'
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true,
//           process: true
//         }),
//         NodeModulesPolyfillPlugin()
//       ]
//     }
//   }
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// export default defineConfig({
//   plugins: [react()],
//   base: './', // use './' for local file preview; '/' for deployment
//   resolve: {
//     alias: {
//       buffer: 'buffer',
//       process: 'process/browser',
//     },
//   },
//   define: {
//     global: 'globalThis',
//   },
//   optimizeDeps: {
//     esbuildOptions: {
//       define: {
//         global: 'globalThis',
//       },
//       plugins: [
//         NodeGlobalsPolyfillPlugin({
//           buffer: true,
//           process: true,
//         }),
//         NodeModulesPolyfillPlugin(),
//       ],
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,   // Ensure buffer polyfill is available
          process: true,  // Ensure process polyfill is available
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});


