import to from 'await-to-js';

export function getError(cb) {
  const [err, res] = await to(cb)
  if(err) {
    
  }
}