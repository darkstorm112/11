const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {  
  // 取出要添加的所有标签
  const { labels } = ctx.request.body 
  const newLabels = []
  // 判断每一个标签在label表中是否存在
  for( let name of labels ){
    const labelResult = await labelService.getLabelByName(name)
    const label = { name }
    // 不存在该标签 创建标签
    if( !labelResult ){
      const result = await labelService.create(name)
      label.id = result.insertId
    }else{
      label.id = labelResult.id
    }
    newLabels.push(label)
  }

  ctx.labels = newLabels
  await next()
}

module.exports = {
  verifyLabelExists
}