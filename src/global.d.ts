/* Allow using <ion-icon /> web component tags inside TSX files.
   This declares the custom element on JSX.IntrinsicElements so TypeScript
   won't report "Property 'ion-icon' does not exist on type 'JSX.IntrinsicElements'".

   Alternatives:
   - Replace usages with React icon components (e.g. `lucide-react` icons already imported
     in `Footer.tsx`).
   - Install and use an official React wrapper for Ionicons.
   - Provide a more specific typing for the element's attributes instead of `any`.
*/

declare namespace JSX {
    interface IntrinsicElements {
        'ion-icon': any;
    }
}
