const pluginName = 'rangewidget';
import $ from 'jquery';
import Widget from '../../js/Widget';
import { isNumber } from '../../js/utils';

/*
 * @constructor
 * @param {Element}                       element   Element to apply widget to.
 * @param {{}|{helpers: *}}                             options   options
 */
function RangeWidget( element, options ) {
    this.namespace = pluginName;
    Widget.call( this, element, options );
    this._init();
}

RangeWidget.prototype = Object.create( Widget.prototype );
RangeWidget.prototype.constructor = RangeWidget;

RangeWidget.prototype._init = function() {
    const that = this;
    this.props = this._getProps();
    const $widget = $(
        `<div class="widget range-widget"><div class="range-widget__wrap"><div class="range-widget__current"/><div class="range-widget__bg"/><div class="range-widget__ticks"/><div class="range-widget__scale"><span class="range-widget__scale__start"/>${this._stepsBetweenHtml( this.props )}${this.resetButtonHtml}<span class="range-widget__scale__end"/></div><div class="range-widget__bulb"><div class="range-widget__bulb__inner"/><div class="range-widget__bulb__mercury"/></div></div><input type="range" class="ignore empty" min="${this.props.min}" max="${this.props.max}" step="${this.props.step}"/></div>`
    );

    $widget.find( '.range-widget__scale__start' ).text( this.props.min );
    $widget.find( '.range-widget__scale__end' ).text( this.props.max );

    this.$number = $( this.element );
    this.$range = $widget.find( 'input' );
    this.$current = $widget.find( '.range-widget__current' );

    this.$number
        .after( $widget )
        .on( 'applyfocus', () => {
            that.$range.focus();
        } )
        .addClass( 'hide' );

    if ( this.props.readonly ) {
        this.disable();
    }

    this.$range
        .on( 'change', function() {
            that.$current.text( this.value );
            that.$number.val( this.value ).trigger( 'change' );
            that._updateMercury( ( this.value - this.min ) / ( that.props.max - that.props.min ) );
        } )
        .on( 'focus', () => {
            that.$number.trigger( 'fakefocus' );
        } );

    // Do not use change handler for this because this doesn't if the user clicks on the internal default
    // value of the range input.
    $widget
        .find( 'input.empty' )
        .on( 'click', () => {
            that.$range.removeClass( 'empty' ).change();
        } );

    $widget
        .find( '.btn-reset' )
        .on( 'click', this._reset.bind( this ) );

    // loads the default value if exists, else resets
    this.update();

    let ticks = this.props.ticks ? Math.ceil( Math.abs( ( this.props.max - this.props.min ) / this.props.step ) ) : 1;
    // Now reduce to a number < 50 to avoid showing a sold black tick line.
    let divisor = Math.ceil( ticks / 50 );
    while ( ticks % divisor && divisor < ticks ) {
        divisor++;
    }
    ticks = ticks / divisor;

    // Various attemps to use more elegant CSS background on the _ticks div, have failed due to little 
    // issues seemingly related to rounding or browser sloppiness. This is less elegant but robust:
    $widget.find( '.range-widget__ticks' ).append( new Array( ticks ).fill( '<span/>' ).join( '' ) );
};

RangeWidget.prototype._getProps = function() {
    const min = isNumber( this.element.getAttribute( 'min' ) ) ? this.element.getAttribute( 'min' ) : 0;
    const max = isNumber( this.element.getAttribute( 'max' ) ) ? this.element.getAttribute( 'max' ) : 10;
    const step = isNumber( this.element.getAttribute( 'step' ) ) ? this.element.getAttribute( 'step' ) : 1;
    const $q = $( this.element ).closest( '.question' );
    const distress = $q.hasClass( 'or-appearance-distress' );
    return {
        min: Number( min ),
        max: Number( max ),
        step: Number( step ),
        readonly: this.element.readOnly,
        vertical: $q.hasClass( 'or-appearance-vertical' ) || distress,
        ticks: !$q.hasClass( 'or-appearance-no-ticks' ),
        distress,
    };
};

RangeWidget.prototype._updateMercury = function( completeness ) {
    const $widget = $( this.element ).next( '.widget' );
    const trackHeight = $widget.find( '.range-widget__ticks' ).height();
    const bulbHeight = $widget.find( '.range-widget__bulb' ).height();
    $widget.find( '.range-widget__bulb__mercury' ).css( 'height', `${( completeness * trackHeight ) + ( 0.5 * bulbHeight )}px` );
};

RangeWidget.prototype._stepsBetweenHtml = props => {
    let html = '';
    if ( props.distress ) {
        const stepsCount = ( props.max - props.min ) / props.step;
        if ( stepsCount <= 10 && ( props.max - props.min ) % props.step === 0 ) {
            for ( let i = props.min + props.step; i < props.max; i += props.step ) {
                html += `<span class="range-widget__scale__between">${i}</span>`;
            }
        }
    }
    return html;
};

RangeWidget.prototype._reset = function() {
    this.$range
        .val( '' ) // this actually sets the value to some default value, not really helpful
        .addClass( 'empty' );

    this.$current.text( '-' );
    this.$number.val( '' ).trigger( 'change' );
    this._updateMercury( -1 );
};

RangeWidget.prototype.disable = function() {
    $( this.element )
        .next( '.widget' )
        .find( 'input, button' )
        .prop( 'disabled', true );
};

RangeWidget.prototype.enable = function() {
    if ( this.props && !this.props.readonly ) {
        $( this.element )
            .next( '.widget' )
            .find( 'input, button' )
            .prop( 'disabled', false );
    }
};

RangeWidget.prototype.update = function() {
    const value = this.element.value;

    if ( isNumber( value ) ) {
        $( this.element )
            .next( '.widget' )
            .find( 'input' )
            .val( value )
            .trigger( 'change' )
            .removeClass( 'empty' );
    } else {
        this._reset();
    }
};


$.fn[ pluginName ] = function( options, event ) {

    options = options || {};

    return this.each( function() {
        const $this = $( this );
        const data = $this.data( pluginName );

        if ( !data && typeof options === 'object' ) {
            $this.data( pluginName, new RangeWidget( this, options, event ) );
        } else if ( data && typeof options == 'string' ) {
            data[ options ]( this );
        }
    } );
};


export default {
    'name': pluginName,
    // avoid initizialing number inputs in geopoint widgets!
    'selector': '.or-appearance-distress input[type="number"], .question > input[type="number"][min][max][step]'
};
