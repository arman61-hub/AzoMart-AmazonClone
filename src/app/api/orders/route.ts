import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber, calculateInclusiveTax } from "@/lib/utils";

const USER_ID = "default-user";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      phone,
    } = body;

    // Validate input fields
    if (!fullName || !addressLine1 || !city || !state || !zipCode || !phone) {
      return NextResponse.json(
        { error: "Missing required shipping fields" },
        { status: 400 }
      );
    }

    // Get current cart items including nested product category details
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: USER_ID },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cannot checkout: Shopping cart is empty" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    
    // Tax calculated dynamically based on product categories (inclusive)
    const tax = cartItems.reduce(
      (sum, item) => sum + calculateInclusiveTax(item.product.price, item.product.category?.slug || "") * item.quantity,
      0
    );
    
    const shippingCost = subtotal > 500 ? 0 : 99;
    
    // Inclusive tax: The subtotal already includes the tax, so total is just subtotal + shipping!
    const totalAmount = subtotal + shippingCost;

    const orderNumber = generateOrderNumber();


    // Run transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: USER_ID,
          fullName,
          addressLine1,
          addressLine2,
          city,
          state,
          zipCode,
          phone,
          subtotal,
          tax,
          shippingCost,
          totalAmount,
          status: "Placed",
        },
      });

      // 2. Create OrderItems & update product stock
      for (const item of cartItems) {
        // Create order item
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.product.price,
            title: item.product.title,
            image: item.product.images[0] || "",
          },
        });

        // Deduct product stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 3. Clear user's cart
      await tx.cartItem.deleteMany({
        where: { userId: USER_ID },
      });

      return newOrder;
    });

    // Return created order with details
    return NextResponse.json(order);
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Optional: GET to fetch a specific order or list orders for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderIdStr = searchParams.get("id");

    if (orderIdStr) {
      const orderId = parseInt(orderIdStr);
      if (isNaN(orderId)) {
        return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
      }

      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          items: true,
        },
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return NextResponse.json(order);
    }

    // Default: list all orders
    const orders = await prisma.order.findMany({
      where: { userId: USER_ID },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
