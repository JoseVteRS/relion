import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: any) => <h1 {...props} className="text-5xl font-bold mt-10 mb-2 text-balance leading-tight" />,
    h2: (props: any) => <h2 {...props} className="text-3xl font-semibold mt-10 mb-2 text-balance leading-tight" />,
    h3: (props: any) => <h3 {...props} className="text-xl font-semibold mt-10 mb-2 text-balance leading-tight" />,
    h4: (props: any) => <h4 {...props} className="text-lg font-semibold mt-10 mb-2 text-balance leading-tight" />,
    h5: (props: any) => <h5 {...props} className="text-base font-semibold mt-10 mb-2 text-balance leading-tight" />,
    h6: (props: any) => <h6 {...props} className="text-xs font-semibold mt-10 mb-2 text-balance leading-tight" />,
    p: (props: any) => <p {...props} className="text-lg my-4 text-pretty leading-relaxed" />,
    a: (props: any) => <a {...props} className="text-blue-500" />,
    ...components,
  }
}