export default {
    "relevant_constraint_required.xml": {
        "html_form": "<form autocomplete=\"off\" novalidate=\"novalidate\" class=\"or clearfix\" dir=\"ltr\" data-form-id=\"relevant-constraint-required\">\n<!--This form was created by transforming an ODK/OpenRosa-flavored (X)Form using an XSL stylesheet created by Enketo LLC.--><section class=\"form-logo\"></section><h3 dir=\"auto\" id=\"form-title\">relevant-constraint-required</h3>\n  \n  \n    <label class=\"question or-branch pre-init non-select \"><span lang=\"\" class=\"question-label active\">something with a relevant that will be cached</span><span class=\"required\">*</span><input type=\"text\" name=\"/data/something\" data-required=\"true()\" data-constraint=\"string-length(.) &gt; 10\" data-relevant=\"1 + 1 = 2\" data-type-xml=\"string\"><span lang=\"\" class=\"or-constraint-msg active\">needs &gt; 10</span><span lang=\"\" class=\"or-required-msg active\">value needed</span><span lang=\"\" class=\"or-relevant-msg active\">always relevant</span></label>\n    <section class=\"or-group-data or-branch pre-init \" name=\"/data/rep\" data-relevant=\" /data/something  != ''\"><section class=\"or-repeat \" name=\"/data/rep\"><label class=\"question or-branch pre-init non-select \"><span lang=\"\" class=\"question-label active\">enter value</span><span class=\"required\">*</span><input type=\"text\" name=\"/data/rep/val\" data-required=\"true()\" data-constraint=\"string-length(.) &gt; 10\" data-relevant=\" /data/something  != 'nothing'\" data-type-xml=\"string\"><span lang=\"\" class=\"or-constraint-msg active\">needs &gt; 10</span><span lang=\"\" class=\"or-required-msg active\">value needed</span><span lang=\"\" class=\"or-relevant-msg active\">relevant if something is not nothing</span></label><label class=\"question or-branch pre-init non-select \"><span lang=\"\" class=\"question-label active\">enter number</span><span class=\"required\">*</span><input type=\"number\" name=\"/data/rep/skipq\" data-required=\"true()\" data-constraint=\"string-length(.) &gt; 2\" data-relevant=\" /data/rep/val  = 'diarrhea'\" data-type-xml=\"int\"><span lang=\"\" class=\"or-constraint-msg active\">needs &gt; 2</span><span lang=\"\" class=\"or-required-msg active\">value needed</span><span lang=\"\" class=\"or-relevant-msg active\">relevant if previous value is diarrhea</span></label>\n            </section><div class=\"or-repeat-info\" data-name=\"/data/rep\"></div><span lang=\"\" class=\"or-relevant-msg active\">relevant if something is not empty</span>\n            </section><!--end of group -->\n  \n<fieldset id=\"or-calculated-items\" style=\"display:none;\"><label class=\"calculation non-select \"><input type=\"hidden\" name=\"/data/meta/instanceID\" data-calculate=\"concat('uuid:', uuid())\" data-type-xml=\"string\"></label></fieldset></form>",
        "xml_model": "<model><instance>\n        <data xmlns:jr=\"http://openrosa.org/javarosa\" xmlns:orx=\"http://openrosa.org/xforms\" xmlns:oc=\"http://openclinica.org/xforms\" id=\"relevant-constraint-required\">\n          <something/>\n          <rep jr:template=\"\">\n            <val/>\n            <skipq/>\n          </rep>\n          <meta>\n            <instanceID/>\n          </meta>\n        </data>\n      </instance></model>"
    },
    "relevant_group.xml": {
        "html_form": "<form autocomplete=\"off\" novalidate=\"novalidate\" class=\"or clearfix\" dir=\"ltr\" data-form-id=\"relevant-group\">\n<!--This form was created by transforming an ODK/OpenRosa-flavored (X)Form using an XSL stylesheet created by Enketo LLC.--><section class=\"form-logo\"></section><h3 dir=\"auto\" id=\"form-title\">relevant-group</h3>\n    \n    \n        <label class=\"question non-select \"><span lang=\"\" class=\"question-label active\">something with a relevant that will be cached</span><span class=\"required\">*</span><input type=\"text\" name=\"/data/something\" data-required=\"true()\" data-constraint=\"string-length(.) &gt; 10\" data-type-xml=\"string\"><span class=\"or-constraint-msg active\" lang=\"\" data-i18n=\"constraint.invalid\">Value not allowed</span><span class=\"or-required-msg active\" lang=\"\" data-i18n=\"constraint.required\">This field is required</span></label>\n        <section class=\"or-group-data or-branch pre-init \" name=\"/data/rep\" data-relevant=\" /data/something  != ''\"><section class=\"or-repeat \" name=\"/data/rep\"><label class=\"question non-select \"><span lang=\"\" class=\"question-label active\">enter value</span><span class=\"required\">*</span><input type=\"text\" name=\"/data/rep/val\" data-required=\"true()\" data-constraint=\"string-length(.) &gt; 10\" data-type-xml=\"string\"><span class=\"or-constraint-msg active\" lang=\"\" data-i18n=\"constraint.invalid\">Value not allowed</span><span class=\"or-required-msg active\" lang=\"\" data-i18n=\"constraint.required\">This field is required</span></label><label class=\"question non-select or-appearance-dn\"><span lang=\"\" class=\"question-label active\">enter value</span><input type=\"text\" name=\"/data/rep/val_comment\" data-for=\"/data/rep/val\" data-type-xml=\"string\"></label><label class=\"question non-select \"><span lang=\"\" class=\"question-label active\">enter number</span><span class=\"required\">*</span><input type=\"number\" name=\"/data/rep/skipq\" data-required=\"true()\" data-constraint=\"string-length(.) &gt; 2\" data-type-xml=\"int\"><span class=\"or-constraint-msg active\" lang=\"\" data-i18n=\"constraint.invalid\">Value not allowed</span><span class=\"or-required-msg active\" lang=\"\" data-i18n=\"constraint.required\">This field is required</span></label>\n            </section><div class=\"or-repeat-info\" data-name=\"/data/rep\"></div><span lang=\"\" class=\"or-relevant-msg active\">relevant if something is not empty</span>\n            </section><!--end of group -->\n    \n<fieldset id=\"or-calculated-items\" style=\"display:none;\"><label class=\"calculation non-select \"><input type=\"hidden\" name=\"/data/rep/calc\" data-calculate=\"2+2\" data-for=\"/data/rep/val\" data-type-xml=\"string\"></label><label class=\"calculation non-select \"><input type=\"hidden\" name=\"/data/meta/instanceID\" data-calculate=\"concat('uuid:', uuid())\" data-type-xml=\"string\"></label></fieldset></form>",
        "xml_model": "<model><instance>\n                <data xmlns:jr=\"http://openrosa.org/javarosa\" xmlns:orx=\"http://openrosa.org/xforms\" xmlns:oc=\"http://openclinica.org/xforms\" xmlns:enk=\"http://enketo.org/xforms\" id=\"relevant-group\">\n                    <something/>\n                    <rep jr:template=\"\">\n                        <val/>\n                        <val_comment>{\"a\": \"b\"}</val_comment>\n                        <calc/>\n                        <skipq/>\n                    </rep>\n                    <meta>\n                        <instanceID/>\n                    </meta>\n                </data>\n            </instance></model>"
    }
};