sequelize model:create --name Dataset --attributes '
id:int,
owner_id:int,
datasource_id:int,
json_data:text
deleted:bool'

sequelize model:create --name Datasource --attributes '
id:int
type:string
config:text'

sequelize model:create --name Transform --attributes '
id:int
document_id:int
function_body:string
order:int'

sequelize model:create --name Document --attributes '
id:int
owner_id:int
dataset_id:int
viz_id:string
viz_opts:text
thumbnail:string
public:bool'
