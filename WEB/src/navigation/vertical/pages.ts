export interface PagesNavigationType {
  name: string
  path: string
  logo?: string
  children?: PagesNavigationType[]
}

const pagesNavigation = (): PagesNavigationType[] => {
  return []
}
export default pagesNavigation
