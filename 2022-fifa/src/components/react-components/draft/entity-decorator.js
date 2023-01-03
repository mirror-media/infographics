import { CompositeDecorator } from 'draft-js'
import { colorTextDecorator } from './color-text'

const decorators = new CompositeDecorator([colorTextDecorator])

export default decorators
