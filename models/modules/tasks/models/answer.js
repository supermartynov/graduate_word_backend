var Answer = sequelize.define(
    'answer',
    {
        status: {type: Sequelize.BOOLEAN, allowNull: false},
        sql_answer: {type: Sequelize.TEXT, allowNull: false}
    },
    {
        tableName: 'answers',
        paranoid: true,
        timestamps: true,
        createdAt: 'created',
        updatedAt: 'updated',
        deletedAt: 'deleted'
    }
);

module.exports = Answer;