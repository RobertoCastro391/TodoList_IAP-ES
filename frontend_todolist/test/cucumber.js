// export default `--require-module @babel/register --require ./test/step_definitions/**/*.js --require ./test/support/**/*.js ./test/features/**/*.feature --publish-quiet`;

module.exports = {
    default: `--require-module @babel/register --require ./test/step_definitions/**/*.js --require ./test/support/**/*.js ./test/features/**/*.feature --publish-quiet`
};