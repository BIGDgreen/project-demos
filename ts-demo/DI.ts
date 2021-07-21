import 'reflect-metadata';
import { parseScript } from 'esprima'

interface IIndexService {
  log(str: string): void
}

interface ITypes {
  [key: string]: Symbol
}

const Types: ITypes = {
  "indexService": Symbol.for("indexService"),
  'demoParam': Symbol.for('demoParam'),
}

function getParams(fn: Function): string[] {
  const ast = parseScript(fn.toString());
  const funcParams: string[] = [];
  const node = ast.body[0];
  if(node.type === 'FunctionDeclaration') {
    for(const param of node.params) {
      if(param.type === 'Identifier') {
        funcParams.push(param.name)
      }
    }
  }
  return funcParams
}

function hasKey<O extends object>(obj: O, key: keyof any):key is keyof O {
  return obj.hasOwnProperty(key)
}

// 依赖注入
function inject(serviceIdentifier: Symbol) {
  console.log('step 1', '进入到 inject', serviceIdentifier);
  return (target: object, targetKey: string, index: number) => {
    console.log('step 2', '进行对构造函数的装饰', target, targetKey, index);
    if(!targetKey) {
      // 说明是构造函数
      Reflect.defineMetadata(serviceIdentifier, new IndexService(), target);
    }
  }
}

function controller<T extends { new(...args: any[]): {} }>(constructor: T) {
  console.log('step 3', '对类进行修饰');

  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      const injectParams = getParams(constructor);
      let identity: string;
      for(identity of injectParams) {
        // 修改参数
        if(hasKey(this, identity)) {
          this[identity] = Reflect.getMetadata(Types[identity], constructor);
        }
      }
      console.log('step 4', '真正的修饰类');
    }
  }

  return Controller
}

class IndexService implements IIndexService {
  log(str: string) {
    console.log(str)
  }
}

@controller
class IndexController {
  private indexService: IndexService;

  constructor(@inject(Types.indexService) indexService: any) {
    this.indexService = indexService;
  }

  info(str: string) {
    this.indexService.log(str);
  }
}

// const indexService = new IndexService();
// const index = new IndexController(indexService);
// index.info();


const index = new IndexController(null);
index.info('运行成功')

// 更深层次的 类的实例托管 IOC(Dependence Inversion Principle) 流程 缓存等


// 设计模式
