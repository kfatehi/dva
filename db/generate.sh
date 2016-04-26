sequelize model:create --name Dataset --attributes '
id:int,
ownerId:int,
datasource_id:int,
jsonData:text
deleted:bool'

sequelize model:create --name Datasource --attributes '
id:int
type:string
config:text'

sequelize model:create --name Transform --attributes '
id:int
documentId:int
functionBody:string
order:int'

sequelize model:create --name Document --attributes '
id:int
ownerId:int
datasetId:int
vizId:string
vizOpts:text
thumbnail:string
public:bool'
