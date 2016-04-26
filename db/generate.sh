sequelize model:create --name Dataset --attributes \
  'ownerId:integer,
datasourceId:integer,
jsonData:text
deleted:boolean'

sequelize model:create --name Datasource --attributes \
  'type:string
config:text'

sequelize model:create --name Transform --attributes \
  'documentId:integer
functionBody:string
order:integer'

sequelize model:create --name Document --attributes \
  'ownerId:integer
datasetId:integer
vizId:string
vizOpts:text
thumbnail:string
public:boolean'
