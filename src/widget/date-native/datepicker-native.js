import Widget from '../../js/Widget';
import $ from 'jquery';
const pluginName = 'datepickerNative';
import support from '../../js/support';

/**
 * The whole purpose of this widget is to hide the placeholder text on native date inputs
 * and show a consistent date format between readonly and non-readonly questions. This widget
 * is only activated for READONLY questions on NON-MOBILE devices.
 * 
 * The placeholder is considered particularly unhelpful for month-year and year appearances. 
 * For consistency it's also removed from regular date inputs.
 * 
 * @constructor
 * @param {Element}                       element   Element to apply widget to.
 * @param {*}    options   options
 * @param {*=}                            event     event
 */

function DatepickerNative( element, options ) {
    this.namespace = pluginName;
    Widget.call( this, element, options );
    this._init();
}

DatepickerNative.prototype = Object.create( Widget.prototype );
DatepickerNative.prototype.constructor = DatepickerNative;

/**
 * Initialize datepicker widget
 */
DatepickerNative.prototype._init = function() {
    this.element.type = 'text';
    this.element.classList.add( 'mask-date' );
};

$.fn[ pluginName ] = function( options, event ) {

    options = options || {};

    return this.each( function() {
        const $this = $( this );
        const dp = $this.data( 'datepickerExtended' );
        const data = $this.data( pluginName );

        // If no datepickerExtended widget is present on the same element
        if ( !dp && typeof options === 'object' && !data && !support.touch ) {
            $this.data( pluginName, new DatepickerNative( this, options, event ) );
        }
    } );
};

export default {
    'name': pluginName,
    'selector': 'input[type="date"]'
};
