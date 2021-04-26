## 2.sequelize 中 Model 常用的数据类型对应 mysql 中的类型

| Model 数据类型                      | mysql 数据类型 | 说明                                                       |
| :---------------------------------- | :------------- | :--------------------------------------------------------- |
| Sequelize.STRING                    | VARCHAR(255)   | 类型：字符串，最大值为 65535 个字符                        |
| Sequelize.STRING(100)               | VARCHAR(100)   | 类型：变长，最大值为 65535 个字符                          |
| Sequelize.TEXT                      | TEXT           | 类型：字符串，最大值为 65535 个字符                        |
| Sequelize.TEXT('long')              | LONGTEXT       | 类型：字符串，最大值为 4,294,967,295 个字符                |
| Sequelize.TEXT('tiny')              | TINYTEXT       | 类型：字符串，最大值为 255 个字符                          |
| Sequelize.INTEGER                   | INTEGER        | 类型：整形，范围为 -2147483648~2147483647                  |
| Sequelize.BIGINT                    | BIGINT         | 类型：整形，范围为 正负 9.22\*10 的 18 次方                |
| Sequelize.BIGINT(10)                | BIGINT(10)     | 类型：整形，范围为 正负 9.22\*10 的 18 次方                |
| Sequelize.FLOAT                     | FLOAT          | 类型：单精度浮点型，8 位精度（4 字节）                     |
| Sequelize.FLOAT(11)                 | FLOAT(11)      | 类型：单精度浮点型，8 位精度（4 字节）                     |
| Sequelize.FLOAT(11,12)              | FLOAT(11,12)   | 类型：单精度浮点型，8 位精度（4 字节）,m 总个数，d 小数位  |
| Sequelize.DOUBLE                    | DOUBLE         | 类型：双精度浮点型，16 位精度（8 字节）                    |
| Sequelize.DOUBLE(11)                | DOUBLE(11)     | 类型：双精度浮点型，16 位精度（8 字节）                    |
| Sequelize.DOUBLE(11,12)             | DOUBLE(11,12)  | 类型：双精度浮点型，16 位精度（8 字节）,m 总个数，d 小数位 |
| Sequelize.DECIMAL                   | DECIMAL        | 类型：定点类型                                             |
| Sequelize.DECIMAL(10,2)             | DECIMAL(10,2)  | 类型：定点类型,参数 m<65,是总个数；d<30 且 d<m,是小数位    |
| Sequelize.DATE                      | DATETIME       | 类型：日期时间类型                                         |
| Sequelize.DATE(6)                   | DATETIME(6)    | 类型：日期时间类型,针对 mysql5.6.4+，支持多达 6 位精度     |
| Sequelize.ENUM('value 1','value 2') | ENUM           | 类型：枚举                                                 |
| Sequelize.BOOLEAN                   | TINYINT(1)     | 类型：整形，范围（-128~127）                               |
| Sequelize.BLOB                      | BLOB           | 类型：二进制数据                                           |
| Sequelize.BLOB('tiny')              | TINYBLOB       | 类型：二进制数据                                           |

## Sequelize 中常用查询条件

| 查询条件               | 说明                            |
| :--------------------- | :------------------------------ |
| [Op.and]:{a:5}         | 且（a=5）                       |
| [Op.or]:[{a:5},{a:6}]  | （a=5 或 a=6）                  |
| [Op.gt]:5              | id>5                            |
| [Op.gte]:5             | id>=5                           |
| [Op.lt]:5              | id<5                            |
| [Op.lte]:5             | id<=5                           |
| [Op.ne]:5              | id!==5                          |
| [Op.eq]:5              | id===5                          |
| [Op.not]:true          | 不是 true                       |
| [Op.between]:[6,10]    | 在 6 和 10 之间                 |
| [Op.notBetween]:[6,10] | 不在 6 和 10 之间               |
| [Op.in]:[1,5]          | 在[1,5]之中                     |
| [Op.notIn]:[1,5]       | 不在[1,5]之中                   |
| [Op.like]:'%ow'        | 包含’%ow‘                       |
| [Op.notLike]:'%ow'     | 不包含’%ow‘                     |
| [Op.regexp]:'^\w'      | 匹配正则表达式,仅限 mysql/pg)   |
| [Op.notRegexp]:'^\w'   | 不匹配正则表达式,仅限 mysql/pg) |
