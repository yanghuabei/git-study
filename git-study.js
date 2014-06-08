/**
 * SSP for APP
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @ignore
 * @file 列表数据模型基类
 * @author otakustay
 */
define(
    function (require) {
        var u = require('common/utilss');
        var ListModel = require('ub-ria/ListModel');
        
        var exports = {};
        var test = { name: 'test' };

        exports.setGlobalData = function (data) {
            this.addData('global', data);
            this.addData('local', data);
        };

        /**
         * 对model数据进行预处理
         *
         * @override
         */
        exports.prepare = function () {
            this.$super(arguments);

            var selectedFields = this.getSelectedFields();
            this.set('selectedFields', selectedFields);
            this.set('hasSelectedField', selectedFields.length > 0);
        };

        /**
         * 获取被选中的筛选条件，若列表需要筛选功能，请重写此方法
         *
         * @return {object[]}
         */
        exports.getSelectedFields = function () {
            return [];
        };

        /**
         * 将一项筛选条件组装为一个对象，包含筛选条件名称，和清除该筛选项的链接，
         *
         * @param {string} name 筛选条件名称
         * @param {number} value 筛选项值
         * @param {object} datasource 筛选条件对应的datasource
         * @return {object}
         */
        exports.getSelectedFieldFromDatasource = function (name, value, datasource) {
            var selectedField = {
                name: name
            };

            var item = u.findWhere(datasource, { value: value });
            selectedField.text = item.text;

            var url = this.get('url');
            var path = url.getPath();
            var query = url.getQuery();
            query = u.omit(query, name);
            var href = '#' + require('er/URL').withQuery(path, query);
            selectedField.url = href;

            return selectedField;
        };

        var ListModel = require('eoo').create(require('ub-ria/mvc/ListModel'), exports);
        return ListModel;
    }
);
